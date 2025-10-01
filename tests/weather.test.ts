import { describe, it, expect, vi } from "vitest";

describe("Weather API", () => {
  it("should return mocked weather data", async () => {
    process.env.ACCUWEATHER_API_KEY = "fake_key";

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: async () => [{ Key: "123" }],
        ok: true
      })
      .mockResolvedValueOnce({
        json: async () => [{ Temperature: { Metric: { Value: 25 } }, WeatherText: "Ensolarado" }],
        ok: true
      });

    const req = new Request("http://localhost/api/weather?city=SaoPaulo&uf=SP");
    const mod = await import("../app/api/weather/route");
    const res = await mod.GET(req);
    const json = await res.json();

    expect(json).toEqual({
      temperatureC: 25,
      weatherText: "Ensolarado"
    });
  });
});
