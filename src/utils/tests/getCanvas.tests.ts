import { getCanvas } from "../getCanvas";

describe("getCanvas", () => {
  let canvas: HTMLCanvasElement | null;

  beforeEach(() => {
    // Create a mock canvas element
    canvas = document.createElement("canvas");
  });

  afterEach(() => {
    canvas = null; // Clean up
  });

  it("should throw an error if canvas is null", () => {
    expect(() => getCanvas(null)).toThrow("HTMLCanvasElement does not exist");
  });

  it("should throw an error if context does not exist", () => {
    // Mock canvas.getContext to return null
    jest.spyOn(canvas!, "getContext").mockReturnValue(null);

    expect(() => getCanvas(canvas)).toThrow(
      "CanvasRenderingContext2D does not exist"
    );
  });
});
