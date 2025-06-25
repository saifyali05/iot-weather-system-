// ✅ Blynk Token: zt4P4lYvq6lr-dJ6bnAJ1WDMdUwET1-7

const apiBase = "https://blynk.cloud/external/api/get?token=zt4P4lYvq6lr-dJ6bnAJ1WDMdUwET1-7";

const endpoints = {
  temp: `${apiBase}&v0`,
  hum: `${apiBase}&v1`,
  air: `${apiBase}&v2`,
  text: `${apiBase}&v3`
};

const el = {
  temp: document.getElementById("temp"),
  hum: document.getElementById("hum"),
  air: document.getElementById("air"),
  msg: document.getElementById("msg"),
  aqiStatus: document.getElementById("aqi-status")
};

/**
 * Determine AQI class based on air quality value
 * @param {string|number} value - AQI value
 * @returns {string} CSS class name
 */
function getAQIClass(value) {
  const aqi = parseInt(value) || 0;
  if (aqi <= 50) return 'aqi-good';
  if (aqi <= 100) return 'aqi-moderate';
  if (aqi <= 150) return 'aqi-unhealthy';
  if (aqi <= 200) return 'aqi-poor';
  return 'aqi-hazardous';
}

/**
 * Get AQI status text based on air quality value
 * @param {string|number} value - AQI value
 * @returns {string} Status description
 */
function getAQIStatus(value) {
  const aqi = parseInt(value) || 0;
  if (aqi <= 50) return 'Good Air Quality';
  if (aqi <= 100) return 'Moderate Air Quality';
  if (aqi <= 150) return 'Unhealthy for Sensitive';
  if (aqi <= 200) return 'Poor Air Quality';
  return 'Hazardous Air Quality';
}

/**
 * Fetch data from Blynk API endpoint
 * @param {string} url - API endpoint URL
 * @returns {Promise<string>} Response data
 */
async function fetchValue(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
    }
    return await res.text(); // Blynk returns plain text values
  } catch (err) {
    console.error("Fetch error:", err);
    return "--";
  }
}

/**
 * Add loading animation to element
 * @param {HTMLElement} element - DOM element
 */
function addLoadingState(element) {
  if (element) {
    element.classList.add('loading');
  }
}

/**
 * Remove loading animation from element
 * @param {HTMLElement} element - DOM element
 */
function removeLoadingState(element) {
  if (element) {
    element.classList.remove('loading');
  }
}

/**
 * Format temperature value with proper decimal places
 * @param {string|number} temp - Temperature value
 * @returns {string} Formatted temperature
 */
function formatTemperature(temp) {
  const temperature = parseFloat(temp);
  if (isNaN(temperature)) return "--°C";
  return `${temperature.toFixed(1)}°C`;
}

/**
 * Format humidity value as integer percentage
 * @param {string|number} hum - Humidity value
 * @returns {string} Formatted humidity
 */
function formatHumidity(hum) {
  const humidity = parseFloat(hum);
  if (isNaN(humidity)) return "--%";
  return `${Math.round(humidity)}%`;
}

/**
 * Update AQI display with dynamic styling
 * @param {string} value - AQI value
 */
function updateAQI(value) {
  if (!el.air || !el.aqiStatus) return;
  
  removeLoadingState(el.air);
  removeLoadingState(el.aqiStatus);
  
  const aqiValue = value || "--";
  const aqiClass = getAQIClass(value);
  const aqiStatusText = getAQIStatus(value);
  
  el.air.textContent = aqiValue;
  el.air.className = `aqi-value ${aqiClass}`;
  el.aqiStatus.textContent = aqiStatusText;
}

/**
 * Main function to refresh all weather data
 */
async function refresh() {
  console.log("Refreshing weather data...");
  
  // Add loading states to all elements
  Object.values(el).forEach(addLoadingState);

  try {
    // Fetch all data concurrently
    const [tempData, humData, airData, msgData] = await Promise.all([
      fetchValue(endpoints.temp),
      fetchValue(endpoints.hum),
      fetchValue(endpoints.air),
      fetchValue(endpoints.text)
    ]);

    // Update temperature
    if (el.temp) {
      removeLoadingState(el.temp);
      el.temp.textContent = formatTemperature(tempData);
    }

    // Update humidity
    if (el.hum) {
      removeLoadingState(el.hum);
      el.hum.textContent = formatHumidity(humData);
    }

    // Update AQI with dynamic styling
    updateAQI(airData);

    // Update suggestion message
    if (el.msg) {
      removeLoadingState(el.msg);
      el.msg.textContent = msgData || "Monitoring environmental conditions...";
    }

    console.log("Weather data updated successfully");
    
  } catch (error) {
    console.error("Error refreshing weather data:", error);
    
    // Remove loading states even on error
    Object.values(el).forEach(removeLoadingState);
    
    // Show error state
    if (el.temp) el.temp.textContent = "--°C";
    if (el.hum) el.hum.textContent = "--%";
    if (el.air) el.air.textContent = "--";
    if (el.aqiStatus) el.aqiStatus.textContent = "Data Unavailable";
    if (el.msg) el.msg.textContent = "Unable to fetch weather data. Please try again later.";
  }
}

/**
 * Initialize the application
 */
function init() {
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Initial data fetch
  refresh();
  
  // Set up periodic refresh every 30 seconds
  setInterval(refresh, 30000);
  
  // Add visibility change handler to refresh when tab becomes visible
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      refresh();
    }
  });
  
  console.log("Weather Monitoring Station initialized");
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}