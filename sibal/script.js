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
function initPriceTicker() {
    const pairPrice = document.querySelector('.pair-price .price');
    const pairChange = document.querySelector('.pair-price .change');
    
    if (pairPrice && pairChange) {
        // Starting values
        let currentPrice = parseFloat(pairPrice.textContent.replace(/,/g, ''));
        let currentChangePercent = parseFloat(pairChange.textContent);
        let direction = Math.random() > 0.5 ? 1 : -1;
        
        setInterval(() => {
            // Occasionally change direction
            if (Math.random() > 0.8) {
                direction *= -1;
            }
            
            // Calculate new price with small random change
            const priceChange = direction * Math.random() * 20;
            currentPrice += priceChange;
            
            // Update change percentage
            currentChangePercent = direction > 0 ? 
                Math.min(5, currentChangePercent + Math.random() * 0.1) : 
                Math.max(-5, currentChangePercent - Math.random() * 0.1);
            
            // Format and display new values
            pairPrice.textContent = currentPrice.toFixed(2);
            pairChange.textContent = `${currentChangePercent > 0 ? '+' : ''}${currentChangePercent.toFixed(2)}%`;
            
            // Update class for color
            if (currentChangePercent > 0) {
                pairChange.classList.remove('negative');
                pairChange.classList.add('positive');
            } else {
                pairChange.classList.remove('positive');
                pairChange.classList.add('negative');
            }
            
            // Flash effect for price changes
            pairPrice.classList.add('price-flash');
            setTimeout(() => {
                pairPrice.classList.remove('price-flash');
            }, 300);
            
        }, 3000); // Update every 3 seconds
    }
}

// Initialize price ticker after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initPriceTicker, 2000);
});

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