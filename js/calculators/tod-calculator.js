/**
 * QuickBrief - TOD Calculator
 * Calculates Top of Descent point based on aircraft parameters
 */

// DOM Elements
const cruiseAltitudeInput = document.getElementById('cruiseAltitude');
const targetAltitudeInput = document.getElementById('targetAltitude');
const groundSpeedInput = document.getElementById('groundSpeed');
const descentAngleRadios = document.getElementsByName('descentAngle');
const customAngleGroup = document.getElementById('customAngleGroup');
const customAngleInput = document.getElementById('customAngle');
const calculateButton = document.getElementById('calculateButton');
const resetButton = document.getElementById('resetButton');
const resultsCard = document.getElementById('resultsCard');

// Result Elements
const todDistanceElement = document.getElementById('todDistance');
const todTimeElement = document.getElementById('todTime');
const descentRateElement = document.getElementById('descentRate');
const descentTimeElement = document.getElementById('descentTime');
const visualCruiseAltitude = document.getElementById('visualCruiseAltitude');
const visualTargetAltitude = document.getElementById('visualTargetAltitude');
const descentAngleIndicator = document.getElementById('descentAngleIndicator');
const todMarker = document.getElementById('todMarker');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners
    calculateButton.addEventListener('click', calculateTOD);
    resetButton.addEventListener('click', resetCalculator);
    
    // Show/hide custom angle input based on radio selection
    for (const radio of descentAngleRadios) {
        radio.addEventListener('change', toggleCustomAngleInput);
    }
    
    // Initialize visualization
    updateVisualization(3, 36000, 10000, 78);
});

/**
 * Toggle custom angle input visibility
 */
function toggleCustomAngleInput() {
    const customSelected = document.querySelector('input[name="descentAngle"][value="custom"]').checked;
    customAngleGroup.style.display = customSelected ? 'block' : 'none';
}

/**
 * Calculate Top of Descent
 */
function calculateTOD() {
    // Get input values
    const cruiseAltitude = parseFloat(cruiseAltitudeInput.value);
    const targetAltitude = parseFloat(targetAltitudeInput.value);
    const groundSpeed = parseFloat(groundSpeedInput.value);
    
    // Get selected descent angle
    let descentAngle = 3; // Default
    for (const radio of descentAngleRadios) {
        if (radio.checked) {
            if (radio.value === 'custom') {
                descentAngle = parseFloat(customAngleInput.value);
            } else {
                descentAngle = parseFloat(radio.value);
            }
            break;
        }
    }
    
    // Validate inputs
    if (isNaN(cruiseAltitude) || isNaN(targetAltitude) || isNaN(groundSpeed) || isNaN(descentAngle)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }
    
    if (targetAltitude >= cruiseAltitude) {
        alert('Target altitude must be lower than cruise altitude.');
        return;
    }
    
    if (descentAngle <= 0 || descentAngle > 6) {
        alert('Descent angle must be between 0.1 and 6 degrees.');
        return;
    }
    
    // Calculate altitude to lose in feet
    const altitudeToLose = cruiseAltitude - targetAltitude;
    
    // Calculate TOD distance in nautical miles
    // Formula: Distance = Altitude to lose / (6076 * tan(descent angle in radians))
    const descentAngleRadians = descentAngle * (Math.PI / 180);
    const todDistance = altitudeToLose / (6076 * Math.tan(descentAngleRadians));
    
    // Calculate descent rate in feet per minute
    // Formula: Descent Rate = Ground Speed * 100 * tan(descent angle in radians)
    const descentRate = groundSpeed * 100 * Math.tan(descentAngleRadians);
    
    // Calculate descent time in minutes
    // Formula: Descent Time = Altitude to lose / Descent Rate
    const descentTime = altitudeToLose / descentRate;
    
    // Calculate time to TOD in minutes
    // Formula: Time to TOD = TOD Distance / Ground Speed * 60
    const todTime = todDistance / groundSpeed * 60;
    
    // Display results
    displayResults(todDistance, todTime, descentRate, descentTime);
    
    // Update visualization
    updateVisualization(descentAngle, cruiseAltitude, targetAltitude, todDistance);
    
    // Show results card with animation
    resultsCard.style.display = 'block';
    resultsCard.classList.add('animate-fade-in');
}

/**
 * Display calculation results
 * @param {number} todDistance - Distance to TOD in nautical miles
 * @param {number} todTime - Time to TOD in minutes
 * @param {number} descentRate - Descent rate in feet per minute
 * @param {number} descentTime - Descent time in minutes
 */
function displayResults(todDistance, todTime, descentRate, descentTime) {
    todDistanceElement.textContent = `${todDistance.toFixed(1)} NM`;
    todTimeElement.textContent = `${todTime.toFixed(1)} min`;
    descentRateElement.textContent = `${descentRate.toFixed(0)} ft/min`;
    descentTimeElement.textContent = `${descentTime.toFixed(1)} min`;
}

/**
 * Update descent visualization
 * @param {number} descentAngle - Descent angle in degrees
 * @param {number} cruiseAltitude - Cruise altitude in feet
 * @param {number} targetAltitude - Target altitude in feet
 * @param {number} todDistance - Distance to TOD in nautical miles
 */
function updateVisualization(descentAngle, cruiseAltitude, targetAltitude, todDistance) {
    // Update altitude labels
    visualCruiseAltitude.textContent = formatAltitude(cruiseAltitude);
    visualTargetAltitude.textContent = formatAltitude(targetAltitude);
    
    // Update descent angle indicator
    descentAngleIndicator.style.transform = `rotate(${descentAngle}deg)`;
    
    // Update TOD marker position (percentage of width)
    // We use a fixed width for visualization, so we need to scale the TOD distance
    const maxDistance = 100; // Maximum distance for visualization in NM
    const todPercentage = Math.min(100, (todDistance / maxDistance) * 100);
    todMarker.style.left = `${todPercentage}%`;
}

/**
 * Format altitude for display
 * @param {number} altitude - Altitude in feet
 * @returns {string} - Formatted altitude string
 */
function formatAltitude(altitude) {
    if (altitude >= 18000) {
        return `FL${Math.round(altitude / 100)}`;
    } else {
        return `${altitude.toLocaleString()} ft`;
    }
}

/**
 * Reset calculator to default values
 */
function resetCalculator() {
    cruiseAltitudeInput.value = '36000';
    targetAltitudeInput.value = '10000';
    groundSpeedInput.value = '280';
    
    // Reset descent angle to standard (3°)
    document.querySelector('input[name="descentAngle"][value="3"]').checked = true;
    toggleCustomAngleInput();
    
    // Hide results
    resultsCard.style.display = 'none';
    
    // Reset visualization
    updateVisualization(3, 36000, 10000, 78);
}
