# 📈 Florel: Stock Analysis Agent

A powerful AI agent powered by **Google's Gemini 2.0 Flash** model, designed to perform comprehensive stock market analysis.

## 🚀 Features

- **Real-time Price Engine**: Fetches live stock prices and daily changes using `yfinance`.
- **News Aggregator**: Retrieves the latest news headlines for any given company.
- **Analyst Ratings**: Summarizes recent analyst recommendations.
- **Cognitive Architecture**: Uses a "Think-Act-Reflect" loop to plan its analysis before execution.

## 🛠️ Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/PlatzDK/Florel.git
    cd Florel
    ```

2.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory (already done if you followed the setup assistant):
    ```env
    GOOGLE_API_KEY=your_api_key_here
    GEMINI_MODEL_NAME=gemini-2.0-flash-exp
    AGENT_NAME=StockAnalyst
    ```

## 🏃 Usage

Run the agent to perform an analysis:

```bash
python -m src.agent
```

By default, it analyzes **GOOGL**. To analyze another stock, you can modify the run command in `src/agent.py` or extend the code to accept command line arguments.

## 🧠 How it works

The agent follows this workflow:
1.  **Receives Task**: "Analyze the stock performance of [TICKER]"
2.  **Thinks**: Plans which tools to use (Price? News? Ratings?).
3.  **Acts**: Calls the Python tools in `src/tools/stock_tools.py`.
4.  **Reflects**: Synthesizes the data into a final report.

## 📂 Project Structure

- `src/agent.py`: The brain of the operation (Gemini Wrapper).
- `src/tools/stock_tools.py`: The hands of the agent (yfinance integration).
- `src/config.py`: Configuration management.
- `artifacts/`: Stores logs and plans.
