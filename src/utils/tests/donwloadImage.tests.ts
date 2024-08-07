import { downloadImage } from "../downloadImage";

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    blob: () =>
      Promise.resolve(new Blob(["image data"], { type: "image/png" })),
  })
) as jest.Mock;

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => "blob:http://localhost/image");
global.URL.revokeObjectURL = jest.fn();

// Mock Image constructor
class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  crossOrigin = "";

  set src(value: string) {
    setTimeout(() => {
      if (value === "blob:http://localhost/image") {
        this.onload && this.onload();
      } else {
        this.onerror && this.onerror();
      }
    }, 0);
  }
}

global.Image = MockImage as any;

describe("downloadImage", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (URL.createObjectURL as jest.Mock).mockClear();
    (URL.revokeObjectURL as jest.Mock).mockClear();
  });

  it("should download and return an image", async () => {
    const url =
      "https://fastly.picsum.photos/id/869/200/300.jpg?hmac=vfzqvPaYnRQQ4fRCoE1BlbCtj0z6DN7EBWnZO0rBrj0";
    const image = await downloadImage(url);

    expect(fetch).toHaveBeenCalledWith(url, { mode: "cors" });
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
    expect(image).toBeInstanceOf(MockImage);
  });

  it("should throw an error if the image cannot be loaded", async () => {
    class ErrorImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      crossOrigin = "";

      set src(value: string) {
        setTimeout(() => {
          if (this.onerror) {
            this.onerror(); // Trigger the error event
          }
        }, 0);
      }
    }

    // Override the global Image object with the mock
    global.Image = ErrorImage as unknown as typeof Image;

    await expect(downloadImage("invalid-url")).rejects.toThrow(
      "Image could not be loaded"
    );
  });
});
