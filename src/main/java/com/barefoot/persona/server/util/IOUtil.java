package com.barefoot.persona.server.util;

import java.io.BufferedWriter;
import java.io.Closeable;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public final class IOUtil {
	
	private IOUtil() {
	}

	public static void writeFile(final File file, final String content)
	throws IOException {
		String filePath = file.getAbsolutePath();
		FileWriter fileWriter = new FileWriter(filePath);
		BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
		try {
			bufferedWriter.write(content);
			file.setLastModified(System.currentTimeMillis());
		} finally {
			IOUtil.close(bufferedWriter);
		}
	}

	public static void close(final Closeable closeable) {
		if (closeable != null) {
			try {
				closeable.close();
			} catch (IOException e) {
				// ignore
			}
		}
	}

}
