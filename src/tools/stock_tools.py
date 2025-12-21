"""
Stock Analysis Tools
-------------------
Tools for retrieving stock data, news, and analyst ratings using yfinance.
"""

import yfinance as yf
from typing import Dict, Any, List

def get_stock_price(ticker: str) -> str:
    """
    Get the current stock price and basic info for a given ticker symbol.
    
    Args:
        ticker: The stock ticker symbol (e.g., 'AAPL', 'GOOGL', 'MSFT').
        
    Returns:
        A string summary of the current stock price and daily change.
    """
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        
        current_price = info.get('currentPrice') or info.get('regularMarketPrice')
        previous_close = info.get('previousClose') or info.get('regularMarketPreviousClose')
        
        if not current_price:
            return f"Could not fetch price data for {ticker}."
            
        change = current_price - previous_close
        change_percent = (change / previous_close) * 100
        
        currency = info.get('currency', 'USD')
        
        return (
            f"Stock: {info.get('shortName', ticker)} ({ticker})\n"
            f"Current Price: {current_price} {currency}\n"
            f"Change: {change:.2f} {currency} ({change_percent:.2f}%)"
        )
    except Exception as e:
        return f"Error fetching stock price for {ticker}: {str(e)}"

def get_company_news(ticker: str, limit: int = 5) -> str:
    """
    Get the latest news headlines for a company.
    
    Args:
        ticker: The stock ticker symbol.
        limit: Number of news items to return (default: 5).
        
    Returns:
        A formatted string of news headlines and links.
    """
    try:
        stock = yf.Ticker(ticker)
        news = stock.news
        
        if not news:
            return f"No news found for {ticker}."
            
        formatted_news = [f"Latest News for {ticker}:"]
        
        for i, item in enumerate(news[:limit], 1):
            title = item.get('title', 'No title')
            publisher = item.get('publisher', 'Unknown')
            link = item.get('link', '#')
            # timestamp = item.get('providerPublishTime', None)
            
            formatted_news.append(f"{i}. {title} ({publisher}) - {link}")
            
        return "\n".join(formatted_news)
    except Exception as e:
        return f"Error fetching news for {ticker}: {str(e)}"

def get_analyst_ratings(ticker: str) -> str:
    """
    Get analyst recommendations and ratings for a stock.
    
    Args:
        ticker: The stock ticker symbol.
        
    Returns:
        A summary of analyst recommendations.
    """
    try:
        stock = yf.Ticker(ticker)
        # Note: Validations might vary by yfinance version/API availability
        recs = stock.recommendations
        
        if recs is None or recs.empty:
            return f"No analyst ratings found for {ticker}."
            
        # Get latest recommendations (tail of the dataframe usually)
        latest = recs.tail(5)
        
        return f"Recent Analyst Ratings for {ticker}:\n{latest.to_string()}"

    except Exception as e:
        return f"Error fetching ratings for {ticker}: {str(e)}"
