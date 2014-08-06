function TermWrapper(options) {
	this.rows = options.rows;
	this.cols = options.cols;
	this.term = new Terminal({
      cols: this.cols,
      rows: this.rows,
      screenKeys: true
    });
}

TermWrapper.prototype.addToElement = function(elementToAddTo) {
	this.termParentElement = $(elementToAddTo);
	this.containerDiv = $("<div id='formatTerm' style='font-family: monospace; margin: 0 auto;overflow:hidden;'></div>");
	this.termParentElement.append(this.containerDiv);
	this.resizeTerm.call(this);
	this.term.open(this.containerDiv[0]);
	this.startLoading.call(this);

};

TermWrapper.prototype.resizeTerm = function() {
	// create an out of sight span to calculate the proper sizing for the terminal
	var hiddenHTML = "<span id='hidden' style='position:absolute;top:-10000000000px;left:-10000000000px;font-family: monospace;color:transparent;''>";
	for (var r = 0; r < this.rows; r++) {
	     for (var c = 0; c < this.cols; c++) {
	        hiddenHTML += "a";
	    }
	    hiddenHTML += "<br>";
	}
	hiddenHTML += "</span>";

	var hiddenSpan = $(hiddenHTML);

	this.termParentElement.append(hiddenSpan);

	var width = hiddenSpan[0].clientWidth;
	var height = hiddenSpan[0].clientHeight;

	this.containerDiv.width(width);
	this.containerDiv.height(height);

	this.spinner = $("<div class='spinner'></div>");
	this.containerDiv.append(this.spinner);
};

TermWrapper.prototype.startLoading = function() {
	this.spinner.fadeIn();

	this.term.reset();
	
	var connectingTextPos = [18,35];
	
	this.term.cursorPos(connectingTextPos);
	this.term.write("Connecting");
	this.loadAnimStep = 0;
	this.loadAnimInterval = setInterval((function() {
		this.term.write(".");
		this.loadAnimStep += 1;
		if (this.loadAnimStep > 3) {
			this.term.cursorPos(connectingTextPos);
			this.term.write("               ");
			this.term.cursorPos(connectingTextPos);
			this.term.write('Connecting');
			this.loadAnimStep = 0;
		}
	}).bind(this),200);
}

TermWrapper.prototype.stopLoading = function() {
	this.spinner.fadeOut();
	clearInterval(this.loadAnimInterval);
	this.term.reset();
}

TermWrapper.prototype.write = function(data) {
	// make sure all newlines are changed to \r\n
	data = data.replace(/(\r\n)|(\n)|(\r)/g,"\r\n");
	this.term.write(data);
}
