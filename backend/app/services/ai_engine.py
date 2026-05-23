import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from typing import List, Dict, Any
from datetime import datetime, timedelta

class VyapaarAIEngine:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=50, random_state=42)

    def forecast_demand(self, historical_sales: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Uses Scikit-Learn to predict 7-day future demand based on transactional arrays.
        """
        if len(historical_sales) < 7:
            return {"status": "insufficient_data", "predicted_units": 0}

        df = pd.DataFrame(historical_sales)
        df['date'] = pd.to_datetime(df['timestamp'])
        df['day_of_week'] = df['date'].dt.dayofweek
        
        X = df[['day_of_week']]
        y = df['quantity']

        self.model.fit(X, y)
        
        future_days = pd.DataFrame({
            'day_of_week': [(datetime.now() + timedelta(days=i)).dayofweek for i in range(1, 8)]
        })
        
        predictions = self.model.predict(future_days)
        total_predicted = int(np.sum(predictions))

        return {
            "status": "success",
            "next_7_days_prediction": total_predicted,
            "recommended_restock": int(total_predicted * 1.2) # 20% buffer
        }
