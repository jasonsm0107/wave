document.addEventListener('DOMContentLoaded', function() {
    // Initialize TradingView Chart
    initTradingViewWidget();
    
    // Initialize UI Interactions
    initUIInteractions();
    
    // Simulate live order book updates
    initOrderBookUpdates();
});

// TradingView Chart Widget Initialization
function initTradingViewWidget() {
    new TradingView.widget({
        container_id: 'trading-chart',
        autosize: true,
        symbol: 'BINANCE:BTCUSDT',
        interval: '15',
        timezone: 'Etc/UTC',
        theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: 'rgba(0, 0, 0, 0)',
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        save_image: false,
        studies: ['RSI@tv-basicstudies'],
        show_popup_button: true,
        popup_width: '1000',
        popup_height: '650',
        withdateranges: true,
        hide_volume: false,
        details: true,
        hotlist: true,
        calendar: true,
    });
}

// Initialize UI Interactions
function initUIInteractions() {
    // Theme Toggle
    const themeSwitch = document.querySelector('.theme-switch');
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-theme');
        // Reinitialize chart with new theme
        initTradingViewWidget();
    });

    // Trade Direction Toggle (Long/Short)
    const directionButtons = document.querySelectorAll('.btn-direction');
    directionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            directionButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');
            
            // Update submit button appearance based on direction
            const submitButton = document.querySelector('.btn-submit');
            submitButton.classList.remove('btn-long', 'btn-short');
            
            if (button.dataset.direction === 'long') {
                submitButton.classList.add('btn-long');
                submitButton.textContent = 'Open Long Position';
            } else {
                submitButton.classList.add('btn-short');
                submitButton.textContent = 'Open Short Position';
            }
        });
    });

    // Trade Type Toggle (Market/Limit)
    const typeButtons = document.querySelectorAll('.btn-type');
    const limitPriceGroup = document.querySelector('.limit-price');
    
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            typeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');
            
            // Show/hide limit price field based on selection
            if (button.dataset.type === 'limit') {
                limitPriceGroup.classList.remove('hidden');
                // Add an animation class for smooth appearance
                limitPriceGroup.classList.add('animate-fade-in');
            } else {
                limitPriceGroup.classList.add('hidden');
            }
        });
    });

    // Amount Denomination Toggle (USDT/BTC)
    const denomButtons = document.querySelectorAll('.denomination-btn');
    const currentDenom = document.getElementById('current-denom');
    
    denomButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            denomButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');
            
            // Update the input addon text
            currentDenom.textContent = button.dataset.denom.toUpperCase();
        });
    });

    // Percentage Buttons for Amount
    const percentButtons = document.querySelectorAll('.percentage-btn');
    const amountSlider = document.querySelector('.amount-slider');
    const amountInput = document.getElementById('trade-amount');
    
    percentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const percent = parseInt(button.dataset.percentage);
            amountSlider.value = percent;
            
            // Calculate the amount based on the percentage
            // This is a simulation - in a real app, you'd calculate based on actual balance
            const balance = 24350.32; // From the UI
            const amount = (balance * percent / 100).toFixed(2);
            amountInput.value = amount;
        });
    });

    // Amount Slider
    amountSlider.addEventListener('input', (e) => {
        const percent = e.target.value;
        // Calculate the amount based on the percentage
        const balance = 24350.32; // From the UI
        const amount = (balance * percent / 100).toFixed(2);
        amountInput.value = amount;
    });

    // Tabs in Bottom Panel
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTabId).classList.add('active');
        });
    });

    // Chart Time Interval Buttons
    const timeButtons = document.querySelectorAll('.btn-time');
    
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            timeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // In a real implementation, you would update the TradingView widget's interval here
        });
    });

    // Chart Type Buttons
    const chartTypeButtons = document.querySelectorAll('.btn-chart');
    
    chartTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            chartTypeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // In a real implementation, you would change the chart type here
        });
    });
    
    // Connect Wallet Button
    const walletButton = document.querySelector('.wallet-connect button');
    
    walletButton.addEventListener('click', () => {
        // Simulate wallet connection
        walletButton.innerHTML = '<span class="btn-icon"><i class="fas fa-check-circle"></i></span> Connected';
        walletButton.disabled = true;
    });
}

// Simulate Live Order Book Updates
function initOrderBookUpdates() {
    // Simulate price and amount changes in the order book
    setInterval(() => {
        // Select random ask and bid rows to update
        const askRows = document.querySelectorAll('.orderbook-asks .orderbook-row');
        const bidRows = document.querySelectorAll('.orderbook-bids .orderbook-row');
        
        // Update a random ask row
        if (askRows.length > 0) {
            const randomAskIndex = Math.floor(Math.random() * askRows.length);
            const randomAskRow = askRows[randomAskIndex];
            
            // Simulate a price change (small fluctuation)
            const currentPrice = parseFloat(randomAskRow.querySelector('.price').textContent);
            const priceChange = (Math.random() * 2 - 1) * 2; // Random change between -2 and +2
            const newPrice = (currentPrice + priceChange).toFixed(2);
            
            // Simulate an amount change
            const currentAmount = parseFloat(randomAskRow.querySelector('.amount').textContent);
            const amountChange = (Math.random() * 0.5 - 0.25); // Random change between -0.25 and +0.25
            const newAmount = Math.max(0.001, (currentAmount + amountChange)).toFixed(3);
            
            // Calculate new total
            const newTotal = (newPrice * newAmount).toFixed(2);
            
            // Apply flash effect for visual feedback
            randomAskRow.classList.add('highlight-row');
            setTimeout(() => {
                randomAskRow.classList.remove('highlight-row');
            }, 300);
            
            // Update the values with a slight delay for visual effect
            setTimeout(() => {
                randomAskRow.querySelector('.price').textContent = newPrice;
                randomAskRow.querySelector('.amount').textContent = newAmount;
                randomAskRow.querySelector('.total span').textContent = newTotal;
                
                // Update the depth visualization
                const maxTotal = 250000; // Arbitrary max value for visualization
                const depthWidth = Math.min(100, (newTotal / maxTotal) * 100);
                randomAskRow.querySelector('.depth-visualization').style.width = `${depthWidth}%`;
            }, 150);
        }
        
        // Update a random bid row
        if (bidRows.length > 0) {
            const randomBidIndex = Math.floor(Math.random() * bidRows.length);
            const randomBidRow = bidRows[randomBidIndex];
            
            // Simulate a price change (small fluctuation)
            const currentPrice = parseFloat(randomBidRow.querySelector('.price').textContent);
            const priceChange = (Math.random() * 2 - 1) * 2; // Random change between -2 and +2
            const newPrice = (currentPrice + priceChange).toFixed(2);
            
            // Simulate an amount change
            const currentAmount = parseFloat(randomBidRow.querySelector('.amount').textContent);
            const amountChange = (Math.random() * 0.5 - 0.25); // Random change between -0.25 and +0.25
            const newAmount = Math.max(0.001, (currentAmount + amountChange)).toFixed(3);
            
            // Calculate new total
            const newTotal = (newPrice * newAmount).toFixed(2);
            
            // Apply flash effect for visual feedback
            randomBidRow.classList.add('highlight-row');
            setTimeout(() => {
                randomBidRow.classList.remove('highlight-row');
            }, 300);
            
            // Update the values with a slight delay for visual effect
            setTimeout(() => {
                randomBidRow.querySelector('.price').textContent = newPrice;
                randomBidRow.querySelector('.amount').textContent = newAmount;
                randomBidRow.querySelector('.total span').textContent = newTotal;
                
                // Update the depth visualization
                const maxTotal = 250000; // Arbitrary max value for visualization
                const depthWidth = Math.min(100, (newTotal / maxTotal) * 100);
                randomBidRow.querySelector('.depth-visualization').style.width = `${depthWidth}%`;
            }, 150);
        }
        
        // Occasionally update the current price and spread
        if (Math.random() > 0.7) {
            const currentPriceElement = document.querySelector('.current-price');
            const spreadValueElement = document.querySelector('.spread-value');
            
            if (currentPriceElement && spreadValueElement) {
                const currentPrice = parseFloat(currentPriceElement.textContent);
                const priceChange = (Math.random() * 10 - 5); // Random change between -5 and +5
                const newPrice = (currentPrice + priceChange).toFixed(2);
                
                // Calculate new spread (random small value for simulation)
                const newSpread = (Math.random() * 0.03 + 0.01).toFixed(2);
                
                // Apply flash effect
                currentPriceElement.classList.add('highlight-price');
                setTimeout(() => {
                    currentPriceElement.classList.remove('highlight-price');
                }, 300);
                
                // Update values
                currentPriceElement.textContent = newPrice;
                spreadValueElement.textContent = `${newSpread}%`;
                
                // Also update the price in the header
                const headerPrice = document.querySelector('.pair-price .price');
                if (headerPrice) {
                    headerPrice.textContent = newPrice;
                }
            }
        }
    }, 2000); // Update every 2 seconds
    
    // Add highlight-row and highlight-price CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
        .highlight-row {
            animation: flash-row 0.3s ease;
        }
        
        .highlight-price {
            animation: flash-price 0.3s ease;
        }
        
        @keyframes flash-row {
            0%, 100% {
                background-color: transparent;
            }
            50% {
                background-color: rgba(3, 127, 252, 0.1);
            }
        }
        
        @keyframes flash-price {
            0%, 100% {
                color: var(--color-primary);
            }
            50% {
                color: var(--color-secondary);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Simulate occasional new orders appearing in the book
    setInterval(() => {
        if (Math.random() > 0.7) {
            // Decide whether to add to asks or bids
            const addToAsks = Math.random() > 0.5;
            
            if (addToAsks) {
                const asksContainer = document.querySelector('.orderbook-asks');
                const askRows = asksContainer.querySelectorAll('.orderbook-row');
                
                // Get the lowest ask price
                const lowestAskPrice = parseFloat(askRows[askRows.length - 1].querySelector('.price').textContent);
                
                // Create a new slightly higher price
                const newPrice = (lowestAskPrice + Math.random() * 3 + 0.5).toFixed(2);
                const amount = (Math.random() * 3 + 0.2).toFixed(3);
                const total = (newPrice * amount).toFixed(2);
                
                // Create new row
                const newRow = createOrderBookRow(newPrice, amount, total, 'sell');
                
                // Insert at the beginning with fade-in effect
                newRow.style.opacity = '0';
                asksContainer.insertBefore(newRow, asksContainer.firstChild);
                
                // Remove the last row to maintain the same number of elements
                if (askRows.length > 0) {
                    asksContainer.removeChild(askRows[askRows.length - 1]);
                }
                
                // Fade in the new row
                setTimeout(() => {
                    newRow.style.transition = 'opacity 0.3s ease';
                    newRow.style.opacity = '1';
                }, 10);
            } else {
                const bidsContainer = document.querySelector('.orderbook-bids');
                const bidRows = bidsContainer.querySelectorAll('.orderbook-row');
                
                // Get the highest bid price
                const highestBidPrice = parseFloat(bidRows[0].querySelector('.price').textContent);
                
                // Create a new slightly lower price
                const newPrice = (highestBidPrice - Math.random() * 3 - 0.5).toFixed(2);
                const amount = (Math.random() * 3 + 0.2).toFixed(3);
                const total = (newPrice * amount).toFixed(2);
                
                // Create new row
                const newRow = createOrderBookRow(newPrice, amount, total, 'buy');
                
                // Insert at the beginning with fade-in effect
                newRow.style.opacity = '0';
                bidsContainer.insertBefore(newRow, bidsContainer.firstChild);
                
                // Remove the last row to maintain the same number of elements
                if (bidRows.length > 0) {
                    bidsContainer.removeChild(bidRows[bidRows.length - 1]);
                }
                
                // Fade in the new row
                setTimeout(() => {
                    newRow.style.transition = 'opacity 0.3s ease';
                    newRow.style.opacity = '1';
                }, 10);
            }
        }
    }, 5000); // Every 5 seconds
}

// Helper function to create a new orderbook row
function createOrderBookRow(price, amount, total, type) {
    const row = document.createElement('div');
    row.className = 'orderbook-row';
    
    const maxTotal = 250000; // Same as in the update function
    const depthWidth = Math.min(100, (total / maxTotal) * 100);
    
    row.innerHTML = `
        <div class="price ${type}">${price}</div>
        <div class="amount">${amount}</div>
        <div class="total">
            <div class="depth-visualization ${type}" style="width: ${depthWidth}%;"></div>
            <span>${total}</span>
        </div>
    `;
    
    return row;
}

// Add additional interactive features for the high-end experience
function enhanceUserExperience() {
    // Add hover effects on order book rows to show potential impact
    const orderBookRows = document.querySelectorAll('.orderbook-row');
    
    orderBookRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            // Highlight this row and all rows above/below it to simulate trade impact
            const isBuy = row.querySelector('.price.buy') !== null;
            let current = row;
            
            if (isBuy) {
                // For buy orders, highlight all rows above (higher prices)
                while (current) {
                    current.classList.add('potential-impact');
                    current = current.previousElementSibling;
                }
            } else {
                // For sell orders, highlight all rows below (lower prices)
                while (current) {
                    current.classList.add('potential-impact');
                    current = current.nextElementSibling;
                }
            }
        });
        
        row.addEventListener('mouseleave', () => {
            // Remove highlight from all rows
            document.querySelectorAll('.potential-impact').forEach(el => {
                el.classList.remove('potential-impact');
            });
        });
    });
    
    // Add tooltip for the leverage selector
    const leverageSelector = document.querySelector('.leverage-selector');
    if (leverageSelector) {
        leverageSelector.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerHTML = 'Adjust leverage to increase buying power. Higher leverage means higher risk.';
            document.body.appendChild(tooltip);
            
            const rect = leverageSelector.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.bottom + 10}px`;
            
            setTimeout(() => {
                tooltip.classList.add('show');
            }, 10);
        });
        
        leverageSelector.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 300);
            }
        });
    }
    
    // Add CSS for these additional effects
    const style = document.createElement('style');
    style.textContent = `
        .potential-impact {
            background-color: rgba(3, 127, 252, 0.05);
        }
        
        .tooltip {
            position: fixed;
            background-color: var(--color-bg-secondary);
            padding: 8px 12px;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-md);
            border: 1px solid var(--color-border);
            font-size: var(--font-size-xs);
            max-width: 250px;
            z-index: var(--z-tooltip);
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .tooltip.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Call enhancement function after a short delay to ensure DOM is fully processed
setTimeout(enhanceUserExperience, 1000);

// Simulate price ticker animation in the header
function initRealTimePriceUpdates() {
    // trading-pair-selection 영역의 가격 요소 선택
    const priceElement = document.querySelector('.trading-pair-selection .pair-price .price');
    if (!priceElement) return;

    // Binance WebSocket API 연결 (BTC/USDT 실시간 거래 데이터)
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // 'data.p'는 거래 가격 (문자열)이므로 소수점 2자리로 변환
        const newPrice = parseFloat(data.p).toFixed(2);
        priceElement.textContent = newPrice;
    };

    ws.onerror = (error) => {
        console.error("WebSocket error: ", error);
    };

    ws.onclose = () => {
        console.log("WebSocket closed. Reconnecting in 5 seconds...");
        // 연결이 끊어지면 재연결 시도
        setTimeout(initRealTimePriceUpdates, 5000);
    };
}

// DOM이 완전히 로드된 후 실시간 업데이트 함수 초기화
document.addEventListener('DOMContentLoaded', initRealTimePriceUpdates);

// Add CSS for the price ticker animation
const tickerStyle = document.createElement('style');
tickerStyle.textContent = `
    .price-flash {
        animation: price-flash 0.3s ease;
    }
    
    @keyframes price-flash {
        0%, 100% {
            color: var(--color-text-primary);
        }
        50% {
            color: var(--color-primary);
        }
    }
`;
document.head.appendChild(tickerStyle);

// 전역 변수로 Order Book 데이터를 관리합니다.
let orderBook = {
    bids: [], // 매수 호가: [price, quantity]
    asks: []  // 매도 호가: [price, quantity]
};

// DOM 업데이트 함수: Order Book 영역의 HTML을 갱신합니다.
function updateOrderBookDOM() {
    const asksContainer = document.querySelector('.orderbook-asks');
    const bidsContainer = document.querySelector('.orderbook-bids');
    if (!asksContainer || !bidsContainer) return;
    
    // 기존 내용을 초기화합니다.
    asksContainer.innerHTML = '';
    bidsContainer.innerHTML = '';
    
    // 매도 호가는 오름차순, 매수 호가는 내림차순 정렬 후 상위 7개만 표시
    const sortedAsks = orderBook.asks
        .slice()  // 원본 배열 보존
        .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
        .slice(0, 7);
    const sortedBids = orderBook.bids
        .slice()
        .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
        .slice(0, 7);
    
    sortedAsks.forEach(level => {
        const [price, qty] = level;
        const total = (parseFloat(price) * parseFloat(qty)).toFixed(2);
        const depthWidth = Math.min(100, (total / 250000) * 100);
        const row = `
            <div class="orderbook-row">
                <div class="price sell">${parseFloat(price).toFixed(2)}</div>
                <div class="amount">${parseFloat(qty).toFixed(3)}</div>
                <div class="total">
                    <div class="depth-visualization sell" style="width: ${depthWidth}%"></div>
                    <span>${total}</span>
                </div>
            </div>
        `;
        asksContainer.innerHTML += row;
    });
    
    sortedBids.forEach(level => {
        const [price, qty] = level;
        const total = (parseFloat(price) * parseFloat(qty)).toFixed(2);
        const depthWidth = Math.min(100, (total / 250000) * 100);
        const row = `
            <div class="orderbook-row">
                <div class="price buy">${parseFloat(price).toFixed(2)}</div>
                <div class="amount">${parseFloat(qty).toFixed(3)}</div>
                <div class="total">
                    <div class="depth-visualization buy" style="width: ${depthWidth}%"></div>
                    <span>${total}</span>
                </div>
            </div>
        `;
        bidsContainer.innerHTML += row;
    });
}

// 초기 Order Book 스냅샷을 REST API를 통해 가져옵니다.
async function fetchInitialOrderBook() {
    try {
        const response = await fetch("https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=20");
        const data = await response.json();
        // REST API에서 받은 bids와 asks 데이터를 저장합니다.
        orderBook.bids = data.bids;
        orderBook.asks = data.asks;
        updateOrderBookDOM();
    } catch (error) {
        console.error("초기 Order Book 스냅샷 로드 실패:", error);
    }
}

// 실시간 Order Book 업데이트를 위한 WebSocket 연결
function initRealTimeOrderBookUpdates() {
    // 먼저 초기 스냅샷을 로드합니다.
    fetchInitialOrderBook();
    
    // Binance Depth WebSocket 연결
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@depth");

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // data.b: 매수 업데이트, data.a: 매도 업데이트
        if (data.b) {
            data.b.forEach(([price, qty]) => {
                if (parseFloat(qty) === 0) {
                    // 수량이 0이면 해당 가격 레벨 제거
                    orderBook.bids = orderBook.bids.filter(level => level[0] !== price);
                } else {
                    // 해당 가격 레벨이 존재하면 업데이트, 없으면 추가
                    const idx = orderBook.bids.findIndex(level => level[0] === price);
                    if (idx > -1) {
                        orderBook.bids[idx][1] = qty;
                    } else {
                        orderBook.bids.push([price, qty]);
                    }
                }
            });
        }
        if (data.a) {
            data.a.forEach(([price, qty]) => {
                if (parseFloat(qty) === 0) {
                    orderBook.asks = orderBook.asks.filter(level => level[0] !== price);
                } else {
                    const idx = orderBook.asks.findIndex(level => level[0] === price);
                    if (idx > -1) {
                        orderBook.asks[idx][1] = qty;
                    } else {
                        orderBook.asks.push([price, qty]);
                    }
                }
            });
        }
        updateOrderBookDOM();
    };

    ws.onerror = (error) => {
        console.error("Order Book WebSocket 에러:", error);
    };

    ws.onclose = () => {
        console.log("Order Book WebSocket 연결이 종료되었습니다. 5초 후 재연결 시도...");
        setTimeout(initRealTimeOrderBookUpdates, 5000);
    };
}

// DOM 로드 후 실시간 Order Book 업데이트 초기화
document.addEventListener('DOMContentLoaded', initRealTimeOrderBookUpdates);
