from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home(): 
    print(request.args.to_dict())
    dark_mode = request.args.to_dict().get("dark_mode","true")
    dark_mode = True if dark_mode == "true" else False
    return render_template("index.html", dark_mode = dark_mode)

@app.route("/about")
def about(): 
    return "You have got a virus"


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
