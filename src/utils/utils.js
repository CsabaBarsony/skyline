const utils = {
  isRecordVisible: (activePage, index, maxItemCount) => {
    let offset = maxItemCount * (activePage - 1);

    return index >= offset && index < offset + maxItemCount;
  }
};

export default utils;
