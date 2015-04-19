package com.barefoot.persona.server.svg;

import java.io.File;

import org.junit.Test;

import com.barefoot.persona.server.util.IOUtil;

public class PersonaBuilderTest {
	
	@Test
	public void testSimpleBuilding() throws Exception {
		StringBuilder svg = new StringBuilder();
		
//		PersonaBuilder personaBuilder = new PersonaBuilder();
//		personaBuilder.toSvg(svg);
		
		new PersonaBuilder()
			.setWinkLeft(true)
			.toSvg(svg);
		
		IOUtil.writeFile(new File("Test.svg"), svg.toString());
	}


}
