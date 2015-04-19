package com.barefoot.persona.server.svg;

import java.io.IOException;

public class PersonaBuilder {
	
	private static final String white = "FFFFFF";
	private static final String skinColor = "FFDB9D";
	
	private boolean drawFace = true;
	private boolean winkLeft = false;
	private boolean winkRight = false;

	public PersonaBuilder setWinkLeft(final boolean winkLeft) {
		this.winkLeft = winkLeft;
		return this;
	}

	public PersonaBuilder setWinkRight(final boolean winkRight) {
		this.winkRight = winkRight;
		return this;
	}

	public void toSvg(final Appendable svg) throws IOException {
		svg.append(
				"<svg version=\"1.1\"\n" +
						 "id=\"Layer_1\"\n" +
						 "xmlns=\"http://www.w3.org/2000/svg\"\n" +
						 "xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n" +
						 "x=\"0px\"\n" +
						 "y=\"0px\"\n" +
						 "width=\"800px\"\n" +
						 "height=\"800px\"\n" +
						 "viewBox=\"0 0 100 100\"\n" +
						 "enable-background=\"new 0 0 100 100\"\n" +
						 "xml:space=\"preserve\">\n" +
					""
				);
		if (drawFace) {
			drawFace(svg);
		}
		drawEye(30, winkLeft, svg);
		drawEye(70, winkRight, svg);
		svg.append("</svg>");
	}

	private void drawFace(Appendable svg) throws IOException {
		svg.append("<circle fill=\"#" + skinColor + "\" stroke=\"#000000\" stroke-width=\"1\" stroke-miterlimit=\"10\" cx=\"50\" cy=\"50\" r=\"50\"/>\n");
	}

	private void drawEye(final int centreX, final boolean wink, final Appendable svg) throws IOException {
		final int radius = 8;
		final int centreY = 40;
		final int winkCentreY = centreY;
		if (wink) {
			svg.append("<defs>");
			svg.append("  <clipPath id=\"cut-off-bottom\">");
			svg.append("    <rect x=\"" + (centreX - radius) + "\" y=\"" + winkCentreY + "\" width=\"" + (2 * radius) + "\" height=\"" + (radius * 1) + "\" />");
			svg.append("  </clipPath>");
			svg.append("</defs>");
			svg.append("<circle fill=\"#" + white + "\" stroke=\"#000000\" stroke-width=\"1\" stroke-miterlimit=\"10\" cx=\"" + centreX + "\" cy=\"" + winkCentreY + "\" r=\"" + radius + "\" clip-path=\"url(#cut-off-bottom)\"/>\n");
		} else {
			svg.append("<circle fill=\"#" + white + "\" stroke=\"#000000\" stroke-width=\"1\" stroke-miterlimit=\"10\" cx=\"" + centreX + "\" cy=\"" + centreY + "\" r=\"" + radius + "\"/>\n");
		}
	}

}
