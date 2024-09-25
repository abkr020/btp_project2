import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib

# Load your dataset
data = pd.read_csv('wait_time_data.csv')

# Prepare features and target
X = data[['arrivalTime', 'department', 'doctorsAvailable']]
y = data['waitTime']

# Split into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a RandomForestRegressor
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate model (optional)
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')

# Save the model to the 'model/' directory
joblib.dump(model, '../backend/model/wait_time_predictor.pkl')

print("Model saved as 'wait_time_predictor.pkl'")
