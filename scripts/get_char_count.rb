require "json"
require "pdf-reader"

latex_file = "small_master"

command = JSON.parse(File.read(".vscode/settings.json"))["latex-workshop.latex.tools"].find {|x| x["name"] == "pdflatex"}
args = command["args"]
command = command["command"]
args = args.map {|x| x == "%DOC%" ? latex_file + ".tex" : x}
`#{command} #{args.join(" ")}`

pdf = PDF::Reader.new(latex_file + ".pdf")
char_count = pdf.pages.map {|x| x.text}.join(" ").gsub(/\s+/, " ").length
File.write("current_char_count.tmp", char_count)
puts char_count
