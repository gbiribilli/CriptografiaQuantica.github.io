from flask import Flask, render_template, request, jsonify
from Algoritmo_Criptografia import tudo

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/processar', methods=['POST'])
def processar():
    try:
        data = request.get_json()
        palavra = data.get('palavra', '')
        resultado = tudo(palavra)
        return jsonify({'resultado': resultado})
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)