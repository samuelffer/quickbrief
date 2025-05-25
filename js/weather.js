/**
 * QuickBrief - Weather Module
 * Integrates with AVWX API to fetch and display weather information for airports
 */

// AVWX API Configuration
const AVWX_API_BASE_URL = 'https://avwx.rest/api';
const AVWX_API_KEY = '15u2Ud5P6qEz5_hUmun77nQa4StnbunffOJt1O1G4zE'; // This would be replaced with a real API key in production

// DOM Elements
const icaoInput = document.getElementById('icaoInput');
const searchButton = document.getElementById('searchButton');
const loadingContainer = document.getElementById('loadingContainer');
const resultsContainer = document.getElementById('resultsContainer');
const errorContainer = document.getElementById('errorContainer');
const errorMessage = document.getElementById('errorMessage');

// METAR Elements
const rawMetar = document.getElementById('rawMetar');
const metarTable = document.getElementById('metarTable');

// TAF Elements
const rawTaf = document.getElementById('rawTaf');
const tafTable = document.getElementById('tafTable');

// Runway Elements
const activeRunways = document.getElementById('activeRunways');
const runwayTable = document.getElementById('runwayTable');

// Wind Elements
const windArrow = document.getElementById('windArrow');
const windSpeed = document.getElementById('windSpeed');
const windDirection = document.getElementById('windDirection');
const windTable = document.getElementById('windTable');

// Station Elements
const stationTable = document.getElementById('stationTable');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners
    searchButton.addEventListener('click', searchAirport);
    icaoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchAirport();
        }
    });
    
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const icao = urlParams.get('icao');
    if (icao) {
        icaoInput.value = icao;
        searchAirport();
    }
});

/**
 * Search for airport weather data
 */
function searchAirport() {
    const icao = icaoInput.value.trim().toUpperCase();
    
    if (!icao) {
        showError(getTranslation('common.error'));
        return;
    }
    
    // Show loading indicator
    showLoading();
    
    // Fetch data
    Promise.all([
        fetchMetar(icao),
        fetchTaf(icao),
        fetchStation(icao)
    ])
    .then(([metarData, tafData, stationData]) => {
        // Hide loading indicator
        hideLoading();
        
        if (metarData.error || tafData.error || stationData.error) {
            showError(getTranslation('weather.error'));
            return;
        }
        
        // Display results
        displayResults(metarData, tafData, stationData);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        hideLoading();
        showError(getTranslation('weather.error'));
    });
}

/**
 * Fetch METAR data from AVWX API
 * @param {string} icao - ICAO code
 * @returns {Promise} - Promise with METAR data
 */
async function fetchMetar(icao) {
    try {
        // In a real implementation, this would be a fetch to the AVWX API
        // For demo purposes, we'll simulate the API response
        
        // Simulated API call
        // const response = await fetch(`${AVWX_API_BASE_URL}/metar/${icao}`, {
        //     headers: {
        //         'Authorization': `Bearer ${AVWX_API_KEY}`
        //     }
        // });
        // return await response.json();
        
        // Simulated response for demo
        return simulateMetarResponse(icao);
    } catch (error) {
        console.error('Error fetching METAR:', error);
        return { error: true };
    }
}

/**
 * Fetch TAF data from AVWX API
 * @param {string} icao - ICAO code
 * @returns {Promise} - Promise with TAF data
 */
async function fetchTaf(icao) {
    try {
        // In a real implementation, this would be a fetch to the AVWX API
        // For demo purposes, we'll simulate the API response
        
        // Simulated API call
        // const response = await fetch(`${AVWX_API_BASE_URL}/taf/${icao}`, {
        //     headers: {
        //         'Authorization': `Bearer ${AVWX_API_KEY}`
        //     }
        // });
        // return await response.json();
        
        // Simulated response for demo
        return simulateTafResponse(icao);
    } catch (error) {
        console.error('Error fetching TAF:', error);
        return { error: true };
    }
}

/**
 * Fetch station data from AVWX API
 * @param {string} icao - ICAO code
 * @returns {Promise} - Promise with station data
 */
async function fetchStation(icao) {
    try {
        // In a real implementation, this would be a fetch to the AVWX API
        // For demo purposes, we'll simulate the API response
        
        // Simulated API call
        // const response = await fetch(`${AVWX_API_BASE_URL}/station/${icao}`, {
        //     headers: {
        //         'Authorization': `Bearer ${AVWX_API_KEY}`
        //     }
        // });
        // return await response.json();
        
        // Simulated response for demo
        return simulateStationResponse(icao);
    } catch (error) {
        console.error('Error fetching station data:', error);
        return { error: true };
    }
}

/**
 * Display weather results
 * @param {Object} metarData - METAR data
 * @param {Object} tafData - TAF data
 * @param {Object} stationData - Station data
 */
function displayResults(metarData, tafData, stationData) {
    // Show results container
    resultsContainer.classList.remove('hidden');
    
    // Display METAR data
    displayMetar(metarData);
    
    // Display TAF data
    displayTaf(tafData);
    
    // Display runway information
    displayRunwayInfo(stationData, metarData);
    
    // Display wind information
    displayWindInfo(metarData);
    
    // Display station information
    displayStationInfo(stationData);
    
    // Update URL with ICAO code for sharing
    updateUrlWithIcao(metarData.station);
}

/**
 * Display METAR data
 * @param {Object} metarData - METAR data
 */
function displayMetar(metarData) {
    // Display raw METAR
    rawMetar.textContent = metarData.raw;
    
    // Clear previous data
    metarTable.innerHTML = '';
    
    // Add METAR data to table
    addTableRow(metarTable, getTranslation('weather.stationName'), metarData.station);
    addTableRow(metarTable, getTranslation('common.time'), formatTime(metarData.time.dt));
    
    if (metarData.wind) {
        addTableRow(metarTable, getTranslation('weather.windDirection'), `${metarData.wind.direction}° ${getWindDirection(metarData.wind.direction)}`);
        addTableRow(metarTable, getTranslation('weather.windSpeed'), `${metarData.wind.speed} ${metarData.units.wind_speed}`);
        
        if (metarData.wind.gust) {
            addTableRow(metarTable, getTranslation('weather.windGust'), `${metarData.wind.gust} ${metarData.units.wind_speed}`);
        }
    }
    
    if (metarData.visibility) {
        addTableRow(metarTable, 'Visibility', `${metarData.visibility.value} ${metarData.units.visibility}`);
    }
    
    if (metarData.temperature) {
        addTableRow(metarTable, 'Temperature', `${metarData.temperature.value}°${metarData.units.temperature}`);
    }
    
    if (metarData.dewpoint) {
        addTableRow(metarTable, 'Dewpoint', `${metarData.dewpoint.value}°${metarData.units.temperature}`);
    }
    
    if (metarData.altimeter) {
        addTableRow(metarTable, 'Altimeter', `${metarData.altimeter.value} ${metarData.units.altimeter}`);
    }
    
    if (metarData.flight_rules) {
        addTableRow(metarTable, 'Flight Rules', metarData.flight_rules);
    }
    
    if (metarData.clouds && metarData.clouds.length > 0) {
        const clouds = metarData.clouds.map(cloud => `${cloud.type} at ${cloud.altitude * 100} ft`).join(', ');
        addTableRow(metarTable, 'Clouds', clouds);
    }
    
    if (metarData.wx_codes && metarData.wx_codes.length > 0) {
        const weather = metarData.wx_codes.map(wx => wx.value).join(', ');
        addTableRow(metarTable, 'Weather', weather);
    }
}

/**
 * Display TAF data
 * @param {Object} tafData - TAF data
 */
function displayTaf(tafData) {
    // Display raw TAF
    rawTaf.textContent = tafData.raw;
    
    // Clear previous data
    tafTable.innerHTML = '';
    
    // Add TAF data to table
    addTableRow(tafTable, getTranslation('weather.stationName'), tafData.station);
    addTableRow(tafTable, 'Issue Time', formatTime(tafData.time.dt));
    
    if (tafData.forecast && tafData.forecast.length > 0) {
        const forecastSummary = tafData.forecast.map(fc => {
            let fcText = `${formatTime(fc.start_time.dt)} to ${formatTime(fc.end_time.dt)}`;
            
            if (fc.wind) {
                fcText += `, Wind: ${fc.wind.direction}° at ${fc.wind.speed} ${tafData.units.wind_speed}`;
            }
            
            if (fc.visibility) {
                fcText += `, Vis: ${fc.visibility.value} ${tafData.units.visibility}`;
            }
            
            if (fc.clouds && fc.clouds.length > 0) {
                fcText += `, Clouds: ${fc.clouds.map(cloud => `${cloud.type} at ${cloud.altitude * 100} ft`).join(', ')}`;
            }
            
            return fcText;
        }).join('\n\n');
        
        addTableRow(tafTable, 'Forecast', forecastSummary, true);
    }
    
    if (tafData.valid_period) {
        addTableRow(tafTable, 'Valid Period', `${formatTime(tafData.valid_period.start)} to ${formatTime(tafData.valid_period.end)}`);
    }
}

/**
 * Display runway information
 * @param {Object} stationData - Station data
 * @param {Object} metarData - METAR data
 */
function displayRunwayInfo(stationData, metarData) {
    // Clear previous data
    activeRunways.innerHTML = '';
    runwayTable.innerHTML = '';
    
    if (!stationData.runways || stationData.runways.length === 0) {
        activeRunways.textContent = getTranslation('weather.noData');
        return;
    }
    
    // Determine active runways based on wind direction
    const windDirection = metarData.wind ? metarData.wind.direction : null;
    const activeRunwayIds = windDirection ? determineActiveRunways(stationData.runways, windDirection) : [];
    
    // Display active runways
    if (activeRunwayIds.length > 0) {
        activeRunwayIds.forEach(runwayId => {
            const runwayIndicator = document.createElement('span');
            runwayIndicator.className = 'runway-indicator';
            runwayIndicator.textContent = runwayId;
            activeRunways.appendChild(runwayIndicator);
        });
    } else {
        activeRunways.textContent = getTranslation('weather.noData');
    }
    
    // Display runway details
    stationData.runways.forEach(runway => {
        const runwayId = `${runway.ident1}/${runway.ident2}`;
        const isActive = activeRunwayIds.includes(runway.ident1) || activeRunwayIds.includes(runway.ident2);
        const runwayStatus = isActive ? '✓ Active' : '';
        
        addTableRow(runwayTable, 'Runway', runwayId);
        addTableRow(runwayTable, getTranslation('weather.runwayLength'), `${runway.length_ft} ft`);
        addTableRow(runwayTable, getTranslation('weather.runwaySurface'), runway.surface);
        
        if (isActive) {
            addTableRow(runwayTable, 'Status', runwayStatus, false, 'active-runway-status');
        }
        
        // Add separator
        const separatorRow = document.createElement('tr');
        separatorRow.innerHTML = '<td colspan="2" style="height: 10px;"></td>';
        runwayTable.appendChild(separatorRow);
    });
}

/**
 * Display wind information
 * @param {Object} metarData - METAR data
 */
function displayWindInfo(metarData) {
    if (!metarData.wind) {
        windSpeed.textContent = '-- kts';
        windDirection.textContent = '---°';
        windArrow.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        return;
    }
    
    // Update wind display
    windSpeed.textContent = `${metarData.wind.speed} ${metarData.units.wind_speed}`;
    windDirection.textContent = `${metarData.wind.direction}°`;
    
    // Rotate wind arrow (add 180 degrees because the arrow points TO the wind direction)
    const arrowRotation = metarData.wind.direction + 180;
    windArrow.style.transform = `translate(-50%, -50%) rotate(${arrowRotation}deg)`;
    
    // Clear previous data
    windTable.innerHTML = '';
    
    // Add wind data to table
    addTableRow(windTable, getTranslation('weather.windDirection'), `${metarData.wind.direction}° ${getWindDirection(metarData.wind.direction)}`);
    addTableRow(windTable, getTranslation('weather.windSpeed'), `${metarData.wind.speed} ${metarData.units.wind_speed}`);
    
    if (metarData.wind.gust) {
        addTableRow(windTable, getTranslation('weather.windGust'), `${metarData.wind.gust} ${metarData.units.wind_speed}`);
    }
    
    // Calculate crosswind and headwind components for each runway
    if (metarData.station && stationData.runways) {
        stationData.runways.forEach(runway => {
            const runway1Heading = parseInt(runway.ident1) * 10;
            const runway2Heading = parseInt(runway.ident2) * 10;
            
            const crosswind1 = calculateCrosswind(metarData.wind.direction, metarData.wind.speed, runway1Heading);
            const headwind1 = calculateHeadwind(metarData.wind.direction, metarData.wind.speed, runway1Heading);
            
            const crosswind2 = calculateCrosswind(metarData.wind.direction, metarData.wind.speed, runway2Heading);
            const headwind2 = calculateHeadwind(metarData.wind.direction, metarData.wind.speed, runway2Heading);
            
            addTableRow(windTable, `Runway ${runway.ident1} ${getTranslation('weather.crosswind')}`, `${Math.abs(crosswind1).toFixed(1)} ${metarData.units.wind_speed} ${crosswind1 >= 0 ? 'from right' : 'from left'}`);
            addTableRow(windTable, `Runway ${runway.ident1} ${getTranslation('weather.headwind')}`, `${headwind1.toFixed(1)} ${metarData.units.wind_speed} ${headwind1 >= 0 ? 'headwind' : 'tailwind'}`);
            
            // Add separator
            const separatorRow = document.createElement('tr');
            separatorRow.innerHTML = '<td colspan="2" style="height: 10px;"></td>';
            windTable.appendChild(separatorRow);
        });
    }
}

/**
 * Display station information
 * @param {Object} stationData - Station data
 */
function displayStationInfo(stationData) {
    // Clear previous data
    stationTable.innerHTML = '';
    
    // Add station data to table
    addTableRow(stationTable, getTranslation('weather.stationName'), stationData.name);
    
    if (stationData.icao) {
        addTableRow(stationTable, 'ICAO', stationData.icao);
    }
    
    if (stationData.iata) {
        addTableRow(stationTable, 'IATA', stationData.iata);
    }
    
    if (stationData.elevation_ft) {
        addTableRow(stationTable, getTranslation('weather.stationElevation'), `${stationData.elevation_ft} ft`);
    }
    
    if (stationData.latitude && stationData.longitude) {
        addTableRow(stationTable, getTranslation('weather.stationLatitude'), stationData.latitude.toFixed(4));
        addTableRow(stationTable, getTranslation('weather.stationLongitude'), stationData.longitude.toFixed(4));
    }
    
    if (stationData.country) {
        addTableRow(stationTable, 'Country', stationData.country);
    }
    
    if (stationData.city) {
        addTableRow(stationTable, 'City', stationData.city);
    }
}

/**
 * Determine active runways based on wind direction
 * @param {Array} runways - Array of runway objects
 * @param {number} windDirection - Wind direction in degrees
 * @returns {Array} - Array of active runway identifiers
 */
function determineActiveRunways(runways, windDirection) {
    if (!runways || runways.length === 0 || !windDirection) {
        return [];
    }
    
    // Calculate the best runway based on wind direction
    const activeRunways = [];
    
    runways.forEach(runway => {
        const runway1Heading = parseInt(runway.ident1) * 10;
        const runway2Heading = parseInt(runway.ident2) * 10;
        
        const headwind1 = calculateHeadwind(windDirection, 1, runway1Heading);
        const headwind2 = calculateHeadwind(windDirection, 1, runway2Heading);
        
        // The runway with the higher headwind component is preferred
        if (headwind1 > headwind2) {
            activeRunways.push(runway.ident1);
        } else {
            activeRunways.push(runway.ident2);
        }
    });
    
    return activeRunways;
}

/**
 * Calculate crosswind component
 * @param {number} windDirection - Wind direction in degrees
 * @param {number} windSpeed - Wind speed
 * @param {number} runwayHeading - Runway heading in degrees
 * @returns {number} - Crosswind component
 */
function calculateCrosswind(windDirection, windSpeed, runwayHeading) {
    const windAngle = ((windDirection - runwayHeading + 180) % 360) - 180;
    return windSpeed * Math.sin(windAngle * Math.PI / 180);
}

/**
 * Calculate headwind component
 * @param {number} windDirection - Wind direction in degrees
 * @param {number} windSpeed - Wind speed
 * @param {number} runwayHeading - Runway heading in degrees
 * @returns {number} - Headwind component
 */
function calculateHeadwind(windDirection, windSpeed, runwayHeading) {
    const windAngle = ((windDirection - runwayHeading + 180) % 360) - 180;
    return windSpeed * Math.cos(windAngle * Math.PI / 180);
}

/**
 * Get wind direction as cardinal direction
 * @param {number} degrees - Wind direction in degrees
 * @returns {string} - Cardinal direction
 */
function getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

/**
 * Format time from ISO string
 * @param {string} isoString - ISO time string
 * @returns {string} - Formatted time string
 */
function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString();
}

/**
 * Add a row to a table
 * @param {HTMLElement} table - Table element
 * @param {string} label - Row label
 * @param {string} value - Row value
 * @param {boolean} multiline - Whether the value should be displayed as multiline
 * @param {string} className - Optional CSS class for the row
 */
function addTableRow(table, label, value, multiline = false, className = '') {
    const row = document.createElement('tr');
    if (className) {
        row.className = className;
    }
    
    const labelCell = document.createElement('td');
    labelCell.textContent = label;
    
    const valueCell = document.createElement('td');
    
    if (multiline) {
        valueCell.style.whiteSpace = 'pre-line';
    }
    
    valueCell.textContent = value;
    
    row.appendChild(labelCell);
    row.appendChild(valueCell);
    
    table.appendChild(row);
}

/**
 * Show loading indicator
 */
function showLoading() {
    loadingContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
}

/**
 * Hide loading indicator
 */
function hideLoading() {
    loadingContainer.classList.add('hidden');
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    errorContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    errorMessage.textContent = message;
}

/**
 * Update URL with ICAO code for sharing
 * @param {string} icao - ICAO code
 */
function updateUrlWithIcao(icao) {
    const url = new URL(window.location.href);
    url.searchParams.set('icao', icao);
    window.history.replaceState({}, '', url);
}

/**
 * Get translation for a key
 * @param {string} key - Translation key
 * @returns {string} - Translated text
 */
function getTranslation(key) {
    // This function would be implemented in language.js
    // For now, we'll return a simple mapping
    const translations = {
        'common.error': 'An error occurred. Please try again.',
        'common.time': 'Time',
        'weather.error': 'Error fetching weather data. Please try again.',
        'weather.loading': 'Loading weather data...',
        'weather.noData': 'No data available',
        'weather.stationName': 'Name',
        'weather.stationElevation': 'Elevation',
        'weather.stationLatitude': 'Latitude',
        'weather.stationLongitude': 'Longitude',
        'weather.windDirection': 'Direction',
        'weather.windSpeed': 'Speed',
        'weather.windGust': 'Gust',
        'weather.crosswind': 'Crosswind',
        'weather.headwind': 'Headwind',
        'weather.runwayLength': 'Length',
        'weather.runwaySurface': 'Surface'
    };
    
    return translations[key] || key;
}

// Simulated API responses for demo purposes
// In a real implementation, these would be replaced with actual API calls

/**
 * Simulate METAR response
 * @param {string} icao - ICAO code
 * @returns {Object} - Simulated METAR data
 */
function simulateMetarResponse(icao) {
    return {
        "meta": {
            "timestamp": "2023-05-25T03:41:00Z"
        },
        "altimeter": {
            "repr": "A2992",
            "value": 29.92,
            "spoken": "two nine point nine two"
        },
        "clouds": [
            {
                "repr": "FEW035",
                "type": "FEW",
                "altitude": 35,
                "modifier": null,
                "direction": null
            },
            {
                "repr": "SCT250",
                "type": "SCT",
                "altitude": 250,
                "modifier": null,
                "direction": null
            }
        ],
        "flight_rules": "VFR",
        "other": [],
        "raw": `${icao} 250341Z 18008KT 10SM FEW035 SCT250 22/17 A2992 RMK AO2 SLP132 T02170172`,
        "remarks": "RMK AO2 SLP132 T02170172",
        "remarks_info": {
            "dewpoint_decimal": {
                "repr": "T02170172",
                "value": 17.2
            },
            "temperature_decimal": {
                "repr": "T02170172",
                "value": 21.7
            }
        },
        "runway_visibility": [],
        "sanitized": `${icao} 250341Z 18008KT 10SM FEW035 SCT250 22/17 A2992 RMK AO2 SLP132 T02170172`,
        "station": icao,
        "temperature": {
            "repr": "22",
            "value": 22,
            "spoken": "two two"
        },
        "dewpoint": {
            "repr": "17",
            "value": 17,
            "spoken": "one seven"
        },
        "time": {
            "repr": "250341Z",
            "dt": "2023-05-25T03:41:00Z"
        },
        "units": {
            "altimeter": "inHg",
            "altitude": "ft",
            "temperature": "C",
            "visibility": "sm",
            "wind_speed": "kt"
        },
        "visibility": {
            "repr": "10SM",
            "value": 10,
            "spoken": "one zero"
        },
        "wind": {
            "repr": "18008KT",
            "direction": 180,
            "speed": 8,
            "gust": null,
            "variable": null
        },
        "wind_direction": {
            "repr": "180",
            "value": 180,
            "spoken": "one eight zero"
        },
        "wind_gust": null,
        "wind_speed": {
            "repr": "08",
            "value": 8,
            "spoken": "eight"
        },
        "wx_codes": []
    };
}

/**
 * Simulate TAF response
 * @param {string} icao - ICAO code
 * @returns {Object} - Simulated TAF data
 */
function simulateTafResponse(icao) {
    return {
        "meta": {
            "timestamp": "2023-05-25T03:41:00Z"
        },
        "raw": `${icao} 250300Z 2503/2603 18010KT P6SM FEW040 SCT250 FM250700 20008KT P6SM SCT040 BKN250 FM251700 22012G20KT P6SM VCSH BKN040 FM252300 24008KT P6SM SCT040 BKN250`,
        "station": icao,
        "time": {
            "repr": "250300Z",
            "dt": "2023-05-25T03:00:00Z"
        },
        "valid_period": {
            "start": "2023-05-25T03:00:00Z",
            "end": "2023-05-26T03:00:00Z"
        },
        "forecast": [
            {
                "altimeter": null,
                "clouds": [
                    {
                        "repr": "FEW040",
                        "type": "FEW",
                        "altitude": 40,
                        "modifier": null,
                        "direction": null
                    },
                    {
                        "repr": "SCT250",
                        "type": "SCT",
                        "altitude": 250,
                        "modifier": null,
                        "direction": null
                    }
                ],
                "flight_rules": "VFR",
                "other": [],
                "sanitized": "18010KT P6SM FEW040 SCT250",
                "visibility": {
                    "repr": "P6SM",
                    "value": 6,
                    "spoken": "greater than six"
                },
                "wind": {
                    "repr": "18010KT",
                    "direction": 180,
                    "speed": 10,
                    "gust": null,
                    "variable": null
                },
                "wind_direction": {
                    "repr": "180",
                    "value": 180,
                    "spoken": "one eight zero"
                },
                "wind_gust": null,
                "wind_speed": {
                    "repr": "10",
                    "value": 10,
                    "spoken": "one zero"
                },
                "wx_codes": [],
                "start_time": {
                    "repr": "2503/2603",
                    "dt": "2023-05-25T03:00:00Z"
                },
                "end_time": {
                    "repr": "2503/2603",
                    "dt": "2023-05-25T07:00:00Z"
                },
                "probability": null,
                "type": "FROM"
            },
            {
                "altimeter": null,
                "clouds": [
                    {
                        "repr": "SCT040",
                        "type": "SCT",
                        "altitude": 40,
                        "modifier": null,
                        "direction": null
                    },
                    {
                        "repr": "BKN250",
                        "type": "BKN",
                        "altitude": 250,
                        "modifier": null,
                        "direction": null
                    }
                ],
                "flight_rules": "VFR",
                "other": [],
                "sanitized": "20008KT P6SM SCT040 BKN250",
                "visibility": {
                    "repr": "P6SM",
                    "value": 6,
                    "spoken": "greater than six"
                },
                "wind": {
                    "repr": "20008KT",
                    "direction": 200,
                    "speed": 8,
                    "gust": null,
                    "variable": null
                },
                "wind_direction": {
                    "repr": "200",
                    "value": 200,
                    "spoken": "two zero zero"
                },
                "wind_gust": null,
                "wind_speed": {
                    "repr": "08",
                    "value": 8,
                    "spoken": "eight"
                },
                "wx_codes": [],
                "start_time": {
                    "repr": "FM250700",
                    "dt": "2023-05-25T07:00:00Z"
                },
                "end_time": {
                    "repr": "FM250700",
                    "dt": "2023-05-25T17:00:00Z"
                },
                "probability": null,
                "type": "FROM"
            }
        ],
        "remarks": "",
        "units": {
            "altimeter": "inHg",
            "altitude": "ft",
            "temperature": "C",
            "visibility": "sm",
            "wind_speed": "kt"
        }
    };
}

/**
 * Simulate station response
 * @param {string} icao - ICAO code
 * @returns {Object} - Simulated station data
 */
function simulateStationResponse(icao) {
    return {
        "city": "New York",
        "country": "US",
        "elevation_ft": 13,
        "elevation_m": 4,
        "gps": "KJFK",
        "iata": "JFK",
        "icao": icao,
        "latitude": 40.63980103,
        "longitude": -73.77890015,
        "name": "John F Kennedy International Airport",
        "note": "",
        "reporting": true,
        "runways": [
            {
                "ident1": "04L",
                "ident2": "22R",
                "length_ft": 11351,
                "width_ft": 150,
                "surface": "ASPHALT",
                "lights": true
            },
            {
                "ident1": "04R",
                "ident2": "22L",
                "length_ft": 8400,
                "width_ft": 200,
                "surface": "ASPHALT",
                "lights": true
            },
            {
                "ident1": "13L",
                "ident2": "31R",
                "length_ft": 10000,
                "width_ft": 150,
                "surface": "ASPHALT",
                "lights": true
            },
            {
                "ident1": "13R",
                "ident2": "31L",
                "length_ft": 14511,
                "width_ft": 150,
                "surface": "ASPHALT",
                "lights": true
            }
        ],
        "state": "NY",
        "type": "large_airport",
        "website": "http://www.panynj.gov/airports/jfk.html"
    };
}

// Global variable to store station data for use in wind calculations
let stationData = null;
