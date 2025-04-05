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

// Create lightweight TradingView chart
function initTradingViewChart() {
  const chartElement = document.getElementById('tradingview-container');
  
  const chart = LightweightCharts.createChart(chartElement, {
    width: chartElement.clientWidth,
    height: chartElement.clientHeight,
    layout: {
      backgroundColor: '#0f2544',
      textColor: 'rgba(255, 255, 255, 0.9)',
      fontSize: 12,
      fontFamily: 'Inter, sans-serif',
    },
    grid: {
      vertLines: {
        color: 'rgba(255, 255, 255, 0.03)',
      },
      horzLines: {
        color: 'rgba(255, 255, 255, 0.03)',
      },
    },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
      vertLine: {
        width: 1,
        color: 'rgba(255, 255, 255, 0.2)',
        style: LightweightCharts.LineStyle.Dotted,
      },
      horzLine: {
        width: 1,
        color: 'rgba(255, 255, 255, 0.2)',
        style: LightweightCharts.LineStyle.Dotted,
      },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textColor: 'rgba(255, 255, 255, 0.5)',
    },
    rightPriceScale: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textColor: 'rgba(255, 255, 255, 0.5)',
    },
    handleScroll: {
      vertTouchDrag: false,
    },
  });

  const candleSeries = chart.addCandlestickSeries({
    upColor: '#36b37e',
    downColor: '#ff5630',
    borderDownColor: '#ff5630',
    borderUpColor: '#36b37e',
    wickDownColor: '#ff5630',
    wickUpColor: '#36b37e',
  });

  // Volume series
  const volumeSeries = chart.addHistogramSeries({
    color: '#26a69a',
    priceFormat: {
      type: 'volume',
    },
    priceScaleId: '',  // Set as an overlay
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  });

  // Generate sample data (in real app, this would come from API)
  const candleData = generateSampleCandleData();
  const volumeData = generateSampleVolumeData(candleData);
  
  candleSeries.setData(candleData);
  volumeSeries.setData(volumeData);

  // Handle responsive chart
  window.addEventListener('resize', () => {
    chart.resize(chartElement.clientWidth, chartElement.clientHeight);
  });
  
  // Store chart instance for later use
  window.tradingChart = chart;
}

function generateSampleCandleData() {
  const data = [];
  const basePrice = 57000;
  const volatility = 1000;
  const numPoints = 200;
  
  let time = new Date();
  time.setHours(time.getHours() - numPoints);

  for (let i = 0; i < numPoints; i++) {
    const openPrice = basePrice + (Math.random() - 0.5) * volatility;
    const closePrice = openPrice + (Math.random() - 0.5) * volatility * 0.5;
    const highPrice = Math.max(openPrice, closePrice) + Math.random() * volatility * 0.2;
    const lowPrice = Math.min(openPrice, closePrice) - Math.random() * volatility * 0.2;
    
    time.setHours(time.getHours() + 1);
    
    data.push({
      time: time.getTime() / 1000,
      open: openPrice,
      high: highPrice,
      low: lowPrice,
      close: closePrice
    });
  }
  
  return data;
}

function generateSampleVolumeData(candleData) {
  return candleData.map(candle => {
    const volume = Math.round(Math.random() * 1000 + 500);
    return {
      time: candle.time,
      value: volume,
      color: candle.open < candle.close ? 'rgba(54, 179, 126, 0.3)' : 'rgba(255, 86, 48, 0.3)',
    };
  });
}

function initOrderBook() {
  // Generate sample order book data
  const asks = generateOrderBookEntries(57433, 57900, 'ask', 15);
  const bids = generateOrderBookEntries(57432, 57000, 'bid', 15);
  
  // Render order book
  renderOrderBook(asks, 'asks');
  renderOrderBook(bids, 'bids');
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
      type: type
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
    
    // Set the width based on the amount relative to other orders
    const width = Math.max(5, Math.min(100, Number(entry.amount) * 20)); // Scale appropriately
    row.style.setProperty('--depth-width', `${width}%`);
    
    row.innerHTML = `
      <div class="col price ${entry.type}">${formatNumber(entry.price)}</div>
      <div class="col amount">${entry.amount}</div>
      <div class="col total">${formatNumber(entry.total)}</div>
    `;
    
    if (entry.type === 'ask') {
      row.style.setProperty('--depth-width', `${width}%`);
      row.style.setProperty('--depth-color', 'rgba(255, 86, 48, 0.15)');
    } else {
      row.style.setProperty('--depth-width', `${width}%`);
      row.style.setProperty('--depth-color', 'rgba(54, 179, 126, 0.15)');
    }
    
    row.querySelector(':scope::before').style.width = `${width}%`;
    container.appendChild(row);
  });
}

function formatNumber(number) {
  return Number(number).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function setupEventListeners() {
  // Direction toggle buttons
  const directionBtns = document.querySelectorAll('.direction-btn');
  directionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      directionBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const direction = this.getAttribute('data-direction');
      const orderBtn = document.querySelector('.open-position-btn');
      
      if (direction === 'long') {
        orderBtn.classList.remove('sell');
        orderBtn.classList.add('buy');
        orderBtn.querySelector('.btn-text').textContent = 'Open Long Position';
      } else {
        orderBtn.classList.remove('buy');
        orderBtn.classList.add('sell');
        orderBtn.querySelector('.btn-text').textContent = 'Open Short Position';
      }
    });
  });
  
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
  percentageBtns.