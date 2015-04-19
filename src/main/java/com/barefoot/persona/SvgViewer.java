package com.barefoot.persona;

import javax.swing.JFrame;

import org.apache.batik.dom.svg.SVGDOMImplementation;
import org.apache.batik.swing.JSVGCanvas;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.svg.SVGDocument;

public class SvgViewer {

  public static void main(String[] args) {
    // Create an SVG document.
    DOMImplementation impl = SVGDOMImplementation.getDOMImplementation();
    SVGDocument doc = (SVGDocument) impl.createDocument(SVGDOMImplementation.SVG_NAMESPACE_URI, "svg", null);
  }


  public static void viewSvg(SVGDocument doc) {

    // Display the document.
    JSVGCanvas canvas = new JSVGCanvas();
    JFrame f = new JFrame();
    f.getContentPane().add(canvas);
    canvas.setSVGDocument(doc);
    f.pack();
    f.setVisible(true);
  }
}
