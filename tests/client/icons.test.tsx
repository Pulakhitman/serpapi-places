import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MapPinIcon,
  markerPinSvg,
  markerRankBadge,
  placeIconLabel,
  placeIconName,
} from "../../src/client/components/icons.js";

describe("placeIconName", () => {
  it("maps common provider categories onto a single icon family", () => {
    expect(placeIconName("Restaurant")).toBe("food");
    expect(placeIconName("Coffee shop")).toBe("food");
    expect(placeIconName("Hotel")).toBe("bed");
    expect(placeIconName("National Park")).toBe("tree");
    expect(placeIconName("Dental clinic")).toBe("health");
    expect(placeIconName("Public library")).toBe("book");
    expect(placeIconName("City hall")).toBe("bank");
    expect(placeIconName("Grocery store")).toBe("bag");
  });

  it("falls back to a plain pin for unknown, empty, or missing categories", () => {
    expect(placeIconName(null)).toBe("pin");
    expect(placeIconName(undefined)).toBe("pin");
    expect(placeIconName("")).toBe("pin");
    expect(placeIconName("Some unclassified thing")).toBe("pin");
  });
});

describe("placeIconLabel", () => {
  it("returns a human-readable label for every family", () => {
    expect(placeIconLabel("food")).toBe("Food and drink");
    expect(placeIconLabel("bed")).toBe("Lodging");
    expect(placeIconLabel("pin")).toBe("Place");
  });
});

describe("markerPinSvg", () => {
  it("embeds the glyph paths for the family and a unique gradient per marker", () => {
    const first = markerPinSvg("food", "osm");
    const second = markerPinSvg("food", "osm");
    // Each marker gets its own gradient id so the fill never bleeds between pins.
    expect(first).not.toBe(second);
    expect(first).toContain("<svg");
    expect(first).toContain("pd-pin__body");
    expect(first).toContain("pd-pin__glyph");
    expect(first).toContain("linearGradient");
  });
});

describe("markerRankBadge", () => {
  it("renders the shared result number and hides it when there is no rank", () => {
    expect(markerRankBadge(3)).toContain(">3<");
    expect(markerRankBadge(3)).toContain("pd-marker__rank");
    expect(markerRankBadge(null)).toBe("");
    expect(markerRankBadge(Number.NaN)).toBe("");
  });

  it("compacts three-digit ranks so the badge does not overflow the pin", () => {
    expect(markerRankBadge(120)).toContain("pd-marker__rank--compact");
  });
});

describe("MapPinIcon", () => {
  it("renders an aria-hidden outline pin so it never adds noise to the a11y tree", () => {
    const markup = renderToStaticMarkup(<MapPinIcon size={24} />);
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain('width="24"');
    expect(markup).toContain("<svg");
  });
});