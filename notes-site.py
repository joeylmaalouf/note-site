from os.path import exists
import random
import string
from flask import Flask, redirect, render_template, request
app = Flask(__name__)


def generate_random_id(length):
	return "".join(random.choice(string.ascii_uppercase+string.ascii_lowercase+string.digits) for i in range(length))


def save_note_contents(note_id, contents):
	f = open("notepads/{0}.txt".format(note_id), "w")
	f.write(contents)
	f.close()


def load_note_contents(note_id):
	path = "notepads/{0}.txt".format(note_id)
	if exists(path):
		f = open(path, "r")
		s = f.read()
		f.close()
		return s
	else:
		return "Welcome to your online notepad!\n\nWhatever you type here will be persistent for this notepad,\nspecified by the ID in the URL. This pad's ID is {0}.\nJust make sure to always hit that \"Save\" button at the top of the page!".format(note_id)


@app.route("/")
def index():
	return redirect(generate_random_id(8))


@app.route("/save/", methods=["POST"])
def save():
	note_id = request.form.get("note_id", None)
	note_text = request.form.get("notepad", None)
	save_note_contents(note_id, note_text)
	return redirect(note_id)


@app.route("/<note_id>/")
def show_note(note_id):
	return render_template("pad.html", note_id = note_id, note_text = load_note_contents(note_id))


if __name__ == "__main__":
	app.run(host = "0.0.0.0")
	# TODO: host this notepad site on its own server?