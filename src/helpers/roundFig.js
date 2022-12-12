function roundFig(lon,lat) {
    return ` coordinates ${Math.round( lon)}, ${Math.round( lat)}`;
}

export default roundFig;