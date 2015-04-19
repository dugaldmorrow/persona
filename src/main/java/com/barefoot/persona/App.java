package com.barefoot.persona;

import java.awt.Color;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;

import org.apache.batik.dom.svg.SVGDOMImplementation;
import org.apache.batik.svggen.SVGGraphics2D;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.svg.SVGDocument;

public class App {
	
	public static void main(String[] args) throws IOException {
		// Get a DOMImplementation.
	    DOMImplementation domImpl = SVGDOMImplementation.getDOMImplementation();

		// Create an instance of org.w3c.dom.Document.
		Document document = domImpl.createDocument(SVGDOMImplementation.SVG_NAMESPACE_URI, "svg", null);
	    SVGDocument doc = (SVGDocument) document;
		
		// Create an instance of the SVG Generator.
		SVGGraphics2D svgGenerator = new SVGGraphics2D(document);

		// Ask the test to render into the SVG Graphics2D implementation.
		App test = new App();
		test.paint(svgGenerator);
		
		Element root = doc.getDocumentElement();
		svgGenerator.getRoot(root);

		// Finally, stream out SVG to the standard output using
		// UTF-8 encoding.
		boolean useCSS = false;
		Writer out = new OutputStreamWriter(System.out, "UTF-8");
		svgGenerator.stream(out, useCSS);
		
		
		SvgViewer.viewSvg(doc);
	}

	public void paint(SVGGraphics2D g) {
	    // Do some drawing.
	    Shape circle = new Ellipse2D.Double(0, 0, 50, 50);
	    g.setPaint(Color.red);
	    g.fill(circle);
	    g.translate(60, 0);
	    g.setPaint(Color.green);
	    g.fill(circle);
	    g.translate(60, 0);
	    g.setPaint(Color.blue);
	    g.fill(circle);
	}

}
