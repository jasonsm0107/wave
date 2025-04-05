document.addEventListener('DOMContentLoaded', function() {
  // Initialize TradingView Chart
  initTradingViewChart();
  
  // Initialize Order Book
  initOrderBook();
  
  // Set up event listeners
  setupEventListeners();
  
  // Initialize range slider
  initRangeSlider();
  
  // Start animations
  startAnimations();
});

// Create TradingView chart using the official widget
function initTradingViewChart() {
  const chartElement = document.getElementById('tradingview-container');
  
  new TradingView.widget({
    container_id: 'tradingview-container',
    width: '100%',
    height: '100%',
    symbol: 'BINANCE:BTCUSDT',
    interval: '60', // 1 hour default
    timezone: 'Etc/UTC',
    theme: 'dark',
    style: '1', // Candlestick chart
    locale: 'en',
    toolbar_bg: '#0f2544',
    enable_publishing: false,
    allow_symbol_change: true,
    hide_side_toolbar: false,
    studies: [
      'MASimple@tv-basicstudies',
      'RSI@tv-basicstudies',
      'MACD@tv-basicstudies'
    ],
    time_frames: [
      { text: '5m', resolution: '5' },
      { text: '15m', resolution: '15' },
      { text: '1h', resolution: '60' },
      { text: '4h', resolution: '240' },
      { text: '1D', resolution: '1D' },
      { text: '1W', resolution: '1W' }
    ],
    container_border_color: '#0f2544',
    calendar: false,
    custom_css_url: 'styles.css',
    overrides: {
      "mainSeriesProperties.candleStyle.upColor": "#36b37e",
      "mainSeriesProperties.candleStyle.downColor": "#ff5630",
      "mainSeriesProperties.candleStyle.borderUpColor": "#36b37e",
      "mainSeriesProperties.candleStyle.borderDownColor": "#ff5630",
      "mainSeriesProperties.candleStyle.wickUpColor": "#36b37e",
      "mainSeriesProperties.candleStyle.wickDownColor": "#ff5630",
      "paneProperties.background": "#0f2544",
      "paneProperties.vertGridProperties.color": "rgba(255, 255, 255, 0.05)",
      "paneProperties.horzGridProperties.color": "rgba(255, 255, 255, 0.05)",
      "symbolWatermarkProperties.transparency": 90,
      "scalesProperties.textColor": "rgba(255, 255, 255, 0.5)",
      "scalesProperties.lineColor": "rgba(255, 255, 255, 0.1)",
    },
    loading_screen: {
      backgroundColor: "#0a1929",
      foregroundColor: "#2684ff",
    },
    disabled_features: [
      "header_symbol_search",
      "header_compare",
      "volume_force_overlay",
    ],
    enabled_features: [
      "use_localstorage_for_settings",
      "side_toolbar_in_fullscreen_mode",
    ],
  });
}

// Initialize Order Book with realistic data
function initOrderBook() {
  // Generate sample order book data
  const asks = generateOrderBookEntries(57433, 57900, 'ask', 15);
  const bids = generateOrderBookEntries(57432, 57000, 'bid', 15);
  
  // Render order book
  renderOrderBook(asks, 'asks');
  renderOrderBook(bids, 'bids');
  
  // Start updating order book in real-time (simulated)
  setInterval(() => {
    updateRandomOrderBookEntries(asks, 'asks');
    updateRandomOrderBookEntries(bids, 'bids');
  }, 2000);
}

function generateOrderBookEntries(startPrice, endPrice, type, count) {
  const entries = [];
  const step = Math.abs(endPrice - startPrice) / count;
  const direction = startPrice < endPrice ? 1 : -1;
  
  for (let i = 0; i < count; i++) {
    const price = startPrice + (step * i * direction);
    const amount = (Math.random() * 2 + 0.1).toFixed(4);
    const total = (price * amount).toFixed(2);
    
    entries.push({
      price: price.toFixed(2),
      amount: amount,
      total: total,
      type: type,
      depth: Math.random() * 80 + 10 // Random depth for visualization
    });
  }
  
  return entries;
}

function renderOrderBook(entries, containerClass) {
  const container = document.querySelector(`.orderbook-rows.${containerClass}`);
  container.innerHTML = '';
  
  entries.forEach(entry => {
    const row = document.createElement('div');
    row.className = `orderbook-row ${entry.type}`;
    
    row.innerHTML = `
      <div class="col price ${entry.type}">${formatNumber(entry.price)}</div>
      <div class="col amount">${entry.amount}</div>
      <div class="col total">${formatNumber(entry.total)}</div>
    `;
    
    // Set before element for depth visualization
    row.style.setProperty('--depth-width', `${entry.depth}%`);
    
    container.appendChild(row);
  });
}

function updateRandomOrderBookEntries(entries, containerClass) {
  // Update a few random entries
  const numToUpdate = Math.floor(Math.random() * 3) + 1;
  const indicesToUpdate = [];
  
  while (indicesToUpdate.length < numToUpdate) {
    const idx = Math.floor(Math.random() * entries.length);
    if (!indicesToUpdate.includes(idx)) {
      indicesToUpdate.push(idx);
    }
  }
  
  // Update selected entries
  indicesToUpdate.forEach(idx => {
    const entry = entries[idx];
    // Slightly change price and amount
    const priceChange = (Math.random() - 0.5) * 5; // -2.5 to 2.5
    const amountChange = (Math.random() - 0.5) * 0.2; // -0.1 to 0.1
    
    const newPrice = Math.max(parseFloat(entry.price) + priceChange, 0.01).toFixed(2);
    const newAmount = Math.max(parseFloat(entry.amount) + amountChange, 0.01).toFixed(4);
    const newTotal = (parseFloat(newPrice) * parseFloat(newAmount)).toFixed(2);
    
    entries[idx] = {
      price: newPrice,
      amount: newAmount,
      total: newTotal,
      type: entry.type,
      depth: Math.random() * 80 + 10 // Update depth for visualization
    };
  });
  
  // Re-render order book with updated entries
  renderOrderBook(entries, containerClass);
  
  // Flash updated rows
  const container = document.querySelector(`.orderbook-rows.${containerClass}`);
  indicesToUpdate.forEach(idx => {
    const row = container.children[idx];
    if (row) {
      const type = entries[idx].type;
      row.classList.add(type === 'ask' ? 'flash-red' : 'flash-green');
      setTimeout(() => {
        row.classList.remove(type === 'ask' ? 'flash-red' : 'flash-green');
      }, 500);
    }
  });
}

function formatNumber(number) {
  return parseFloat(number).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function setupEventListeners() {
  // Direction toggle buttons (Long/Short)
  const longButton = document.getElementById('longButton');
  const shortButton = document.getElementById('shortButton');
  const positionButton = document.getElementById('positionButton');
  
  if (longButton && shortButton && positionButton) {
    // Long button click
    longButton.addEventListener('click', function() {
      // Toggle active class
      longButton.classList.add('active');
      shortButton.classList.remove('active');
      
      // Update position button
      positionButton.classList.remove('sell');
      positionButton.classList.add('buy');
      positionButton.querySelector('.btn-text').textContent = 'Open Long Position';
      
      // Apply animations
      positionButton.classList.add('animation-pulse');
      setTimeout(() => {
        positionButton.classList.remove('animation-pulse');
      }, 500);
    });
    
    // Short button click
    shortButton.addEventListener('click', function() {
      // Toggle active class
      shortButton.classList.add('active');
      longButton.classList.remove('active');
      
      // Update position button
      positionButton.classList.remove('buy');
      positionButton.classList.add('sell');
      positionButton.querySelector('.btn-text').textContent = 'Open Short Position';
      
      // Apply animations
      positionButton.classList.add('animation-pulse');
      setTimeout(() => {
        positionButton.classList.remove('animation-pulse');
      }, 500);
    });
  }
  
  // Order type toggle
  const orderTypeBtns = document.querySelectorAll('.order-type-btn');
  const limitPriceGroup = document.querySelector('.limit-price-group');
  
  orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      orderTypeBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const orderType = this.getAttribute('data-type');
      if (orderType === 'limit') {
        limitPriceGroup.classList.remove('hidden');
      } else {
        limitPriceGroup.classList.add('hidden');
      }
    });
  });
  
  // Unit toggle
  const unitBtns = document.querySelectorAll('.unit-btn');
  const inputTag = document.querySelector('.input-tag');
  
  unitBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      unitBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const unit = this.getAttribute('data-unit');
      inputTag.textContent = unit.toUpperCase();
    });
  });
  
  // Percentage buttons
  const percentageBtns = document.querySelectorAll('.percentage-btn');
  const amountInput = document.querySelector('.form-input');
  const availableBalance = 24032.58; // Example balance
  
  percentageBtns.forEach((btn, index) => {
    btn.addEventListener('click', function() {
      const percentages = [0.25, 0.5, 0.75, 1.0];
      const percentage = percentages[index];
      const amount = (availableBalance * percentage).toFixed(2);
      
      // Update input field with calculated amount
      amountInput.value = formatNumber(amount);
      
      // Highlight active percentage button
      percentageBtns.forEach(b => b.style.fontWeight = '500');
      this.style.fontWeight = '600';
    });
  });
  
  // Chart timeframe selection
  const timeButtons = document.querySelectorAll('.time-btn');
  timeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      timeButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // In a real implementation, this would update the TradingView chart timeframe
      // For this demo we'll just simulate the change
      const timeframe = this.textContent.trim();
      console.log(`Changing chart timeframe to: ${timeframe}`);
    });
  });
}

function initRangeSlider() {
  const slider = document.getElementById('leverageSlider');
  const track = document.getElementById('leverageTrack');
  const valueDisplay = document.querySelector('.leverage-value');
  const maxPositionDisplay = document.getElementById('maxPosition');
  const availableBalance = 24032.58; // Example balance
  
  if (slider && track && valueDisplay) {
    // Update track width and value display on slider change
    function updateSlider() {
      const value = slider.value;
      const percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;
      track.style.width = `${percentage}%`;
      valueDisplay.textContent = `${value}×`;
      
      // Update max position based on leverage
      const maxPosition = (availableBalance * value).toFixed(2);
      maxPositionDisplay.textContent = `${formatNumber(maxPosition)} USDT`;
      
      // Add pulse effect to leverage value
      valueDisplay.classList.add('pulse');
      setTimeout(() => {
        valueDisplay.classList.remove('pulse');
      }, 500);
    }
    
    // Initialize slider
    updateSlider();
    
    // Add event listener for slider input
    slider.addEventListener('input', updateSlider);
    
    // Add event listener for slider mousedown
    slider.addEventListener('mousedown', () => {
      document.body.style.cursor = 'grabbing';
    });
    
    // Add event listener for slider mouseup
    slider.addEventListener('mouseup', () => {
      document.body.style.cursor = '';
    });
    
    // Add event listeners for leverage value click (for mobile devices)
    valueDisplay.addEventListener('click', () => {
      const randomLeverage = Math.floor(Math.random() * (slider.max - slider.min)) + parseInt(slider.min);
      slider.value = randomLeverage;
      updateSlider();
    });
  }
}

function startAnimations() {
  // Animate order book rows on page load
  const orderBookRows = document.querySelectorAll('.orderbook-row');
  
  orderBookRows.forEach((row, index) => {
    setTimeout(() => {
      row.style.opacity = '1';
      row.style.transform = 'translateX(0)';
    }, 50 * index);
  });
  
  // Animate price updates
  const priceValue = document.querySelector('.price-value');
  const currentPrice = parseFloat(priceValue.textContent.replace(/,/g, ''));
  
  setInterval(() => {
    // Random price fluctuation
    const newPrice = currentPrice + (Math.random() - 0.5) * 20;
    
    // Check if price increased or decreased
    const priceChange = newPrice > currentPrice;
    
    // Animate price change
    priceValue.classList.add(priceChange ? 'flash-green' : 'flash-red');
    
    setTimeout(() => {
      priceValue.textContent = formatNumber(newPrice);
      priceValue.classList.remove(priceChange ? 'flash-green' : 'flash-red');
    }, 200);
  }, 5000);
  
  // Add hover effects to elements
  const interactiveElements = document.querySelectorAll('.direction-btn, .order-type-btn, .percentage-btn, .open-position-btn');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseover', () => {
      el.style.transform = 'translateY(-2px)';
    });
    
    el.addEventListener('mouseout', () => {
      el.style.transform = '';
    });
  });
}