from bottle import Bottle, request, response
import pickle
import json
import joblib
import numpy as np
import gc

model = joblib.load('model.joblib')

# with open('ml/model.pkl', 'rb') as model_file:
#     model = pickle.load(model_file)

print(model.feature_importances_)
print(model.feature_names_in_)
app = Bottle()

@app.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@app.route('/predict', method=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return {}
    try:
        data = request.json
    except Exception as e:
        response.status = 400
        return json.dumps({'error': 'Invalid JSON input'})

    try:
        features = [
            int(data.get("OCCUR_TM")),
            int(data.get("VEH_CATEGORY")),
            int(data.get("RPTED_AGE")),
            int(data.get("SEX_CD")),
            int(data.get("RACE_DESC")),
            int(data.get("bct2020"))
        ]
    except (ValueError, TypeError) as e:
        response.status = 400
        return json.dumps({'error': 'Invalid or missing data in input fields'})

    features_array = np.array(features).reshape(1, -1)
    global model
    prediction = model.predict_proba(features_array)[:, 1][0]
    response.content_type = 'application/json'
    return json.dumps({'prediction': round(float(prediction), 4)})

# @app.route('/turnoff', method=['GET'])
# def turnoff():
#     if request.method == 'OPTIONS':
#         return {}
#     global model
#     del model
#     model = None
#     gc.collect(generation=2)
#     return "Ok"

if __name__ == "__main__":
    app.run(host='localhost', port=8069)
