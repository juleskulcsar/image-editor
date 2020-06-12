const Filters = {
  invertColors(data) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] ^ 255;
      data[i + 1] = data[i + 1] ^ 255;
      data[i + 2] = data[i + 2] ^ 255;
    }
    return data;
  },

  rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i - 150] = pixels.data[i + 0]; // RED
      pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
      pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
  },

  redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 50; // RED
      pixels.data[i + 1] = pixels.data[i + 1] - 10; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
  },

  greenEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] - 50; // RED
      pixels.data[i + 1] = pixels.data[i + 1] + 100; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
  },

  blueEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] - 50; // RED
      pixels.data[i + 1] = pixels.data[i + 1] + 50; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] + 150; // Blue
    }
    return pixels;
  },

  sepiaEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      const red = pixels.data[i];
      const green = pixels.data[i + 1];
      const blue = pixels.data[i + 2];
      const alpha = pixels.data[i + 3];
      const tRed = 0.393 * red + 0.769 * green + 0.189 * blue;
      const tGreen = 0.394 * red + 0.686 * green + 0.168 * blue;
      const tBlue = 0.272 * red + 0.543 * green + 0.131 * blue;
      pixels.data[i] = tRed;
      pixels.data[i + 1] = tGreen;
      pixels.data[i + 2] = tBlue;
    }
    return pixels;
  },

  bwEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      const red = pixels.data[i];
      const green = pixels.data[i + 1];
      const blue = pixels.data[i + 2];
      const alpha = pixels.data[i + 3];
      const gray = (red + green + blue) / 3;
      pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = gray;
    }
    return pixels;
  },

  greenEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] - 100; // RED
      pixels.data[i + 1] = pixels.data[i + 1] - 1; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] - 5; // Blue
    }
    return pixels;
  },

  redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
      pixels.data[i + 1] = pixels.data[i + 1] - 1; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] - 5; // Blue
    }
    return pixels;
  },

  darkWarmEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 10; // RED
      pixels.data[i + 1] = pixels.data[i + 1] - 1; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] - 50; // Blue
    }
    return pixels;
  },

  cyanEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 10; // RED
      pixels.data[i + 1] = pixels.data[i + 1] + 50; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] + 50; // Blue
    }
    return pixels;
  },

  washedOutEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 50; // RED
      pixels.data[i + 1] = pixels.data[i + 1] + 50; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] + 50; // Blue
    }
    return pixels;
  },

  yellowEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 50; // RED
      pixels.data[i + 1] = pixels.data[i + 1] + 50; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] - 50; // Blue
    }
    return pixels;
  },

  warmEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 5; // RED
      pixels.data[i + 1] = pixels.data[i + 1] + 10; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] - 20; // Blue
    }
    return pixels;
  },

  coldEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 0] = pixels.data[i + 0] - 5; // RED
      pixels.data[i + 1] = pixels.data[i + 1] + 10; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] + 20; // Blue
    }
    return pixels;
  }
};
