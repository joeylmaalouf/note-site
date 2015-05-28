import random
import string
from flask import Flask, redirect
app = Flask(__name__)


def generate_random_id(length):
	return "".join(random.choice(string.ascii_uppercase+string.ascii_lowercase+string.digits) for i in range(length))


@app.route("/")
def index():
	return redirect(generate_random_id(8))


@app.route("/<note_id>/")
def show_note(note_id):
	return "<textarea style=\"width:97.5vw; height:97.5vh; margin:auto; display:block; resize:none\">Welcome to your notepad!\nThis pad's ID is "+str(note_id)+".</textarea>"
	# TODO: figure out nicer styling, inline is ugly
	# TODO: automatically save and load notepad contents in ./notepads/<note_id>


if __name__ == "__main__":
	app.run(host = "0.0.0.0")
