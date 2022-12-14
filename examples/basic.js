const GOOGLE_MAPS_API_KEY = "";

const route_1_label = "Millbrae";
const route_1_origin = "Millbrae Bart";
const route_1_destination = "Montgomery Bart";

const route_2_label = "Montgomery";
const route_2_origin = "Montgomery Bart";
const route_2_destination = "Millbrae Bart";

const routes = [
  {
    label: route_1_label,
    origin_destination: [
      route_1_origin,
      route_1_destination,
    ],
  },
  {
    label: route_2_label,
    origin_destination: [
      route_2_origin,
      route_2_destination,
    ],
  },
];

// Light-Mode 1st, Dark-Mode 2nd
const colors = {
  widgetBg: Color.dynamic(
    new Color("#EAECED"),
    new Color("#22262C")
  ),
  cellBackgroundColor: Color.dynamic(
    new Color("#D0D2D4"),
    new Color("#3C4044")
  ),
  update: Color.dynamic(
    new Color("#676767"),
    new Color("#A1A1A6")
  ),
  labelTextColor: Color.dynamic(
    new Color("#00204F"),
    new Color("#88C4C9")
  ),
  cellTextColor: Color.dynamic(
    new Color("#212121"),
    new Color("#FFFFFF")
  ),
};

const widget = new ListWidget();
widget.backgroundColor = colors.widgetBg;

function composeGoogleMapsRequestUrl(origin, destination) {
  return [
    "https://maps.googleapis.com/maps/api/directions/json",
    `?origin=${encodeURIComponent(origin)}`,
    `&destination=${encodeURIComponent(destination)}`,
    "&mode=transit",
    "&transit_mode=rail",
    "&transit_routing_preference=fewer_transfers",
    "&alternatives=true",
    `&key=${GOOGLE_MAPS_API_KEY}`,
  ].join("");
}

async function getStopData(origin, destination) {
  const googleMapsRequestUrl = 
    composeGoogleMapsRequestUrl(
        origin,
        destination
    );
  const googleMapsRequest = new Request(
    googleMapsRequestUrl
  );
  return googleMapsRequest.loadJSON();
}

function getStopTimes(stopData) {
  const routes = stopData.routes.filter((route) => {
    // No Multi Modal Trips
    return (
      route.legs.length === 1 &&
      route.legs[0].steps.length === 3
    );
  });

  const routeTimes = routes.map((route) => {
    return route.legs[0].departure_time.text;
  });

  return routeTimes;
}

function createRouteScheduleStack(stopTimes, color, label) {
  let scheduleLabel = widget.addText(label);
  scheduleLabel.textColor = colors.labelTextColor;
  scheduleLabel.font = Font.boldSystemFont(14);

  let row = widget.addStack();
  row.setPadding(4, 0, 0, 0);

  stopTimes.forEach((_time, idx) => {
    let cell = row.addStack();
    cell.backgroundColor = colors.cellBackgroundColor;
    cell.setPadding(2, 3, 2, 3);
    cell.cornerRadius = 4;

    // Slice the "am" or "pm" from the time string
    const time = _time.slice(0, -2);

    let cellText = cell.addText(time);
    cellText.font = Font.mediumSystemFont(12);

    cellText.textColor = colors.cellTextColor;

    // Add some spacing to the right of each cell
    const isLastIteration = idx === stopTimes.length - 1;

    widget.addStack(row);
    if (!isLastIteration) {
      row.addText(" ");
    }
  });
}

let i = 0;
let len = routes.length;

for (i; i < len; i++) {
  const route = routes[i];
  const [origin, destination] = route.origin_destination;

  const stopData = await getStopData(origin, destination);
  const stopTimes = getStopTimes(stopData);
  createRouteScheduleStack(
    stopTimes.slice(0, 3),
    route.color,
    route.label
  );

  widget.addSpacer();
}

let lastUpdatedAt =
  "Last updated " + new Date().toLocaleTimeString();
const lastUpdatedAtText = widget.addText(lastUpdatedAt);
lastUpdatedAtText.textColor = colors.updated;
lastUpdatedAtText.font = Font.lightSystemFont(8);

// Every 10 minutes
const now = Date.now();
widget.refreshAfterDate = new Date(now + 1000 * 60 * 10);

Script.setWidget(widget);
Script.complete();

widget.presentSmall();
