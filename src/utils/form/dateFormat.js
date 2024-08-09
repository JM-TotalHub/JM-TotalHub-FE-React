export const formatDate = (dateString) => {
  const date = new Date(dateString);
  let formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  if (formattedDate.endsWith('.')) {
    formattedDate = formattedDate.slice(0, -1);
  }
  return formattedDate;
};

export const formatDateWithToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  if (isToday) {
    return (
      '당일 ' +
      date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24시간제로 설정
      })
    );
  } else {
    // toLocaleDateString 사용 후 마지막 마침표 제거
    let formattedDate = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    if (formattedDate.endsWith('.')) {
      formattedDate = formattedDate.slice(0, -1);
    }
    return formattedDate;
  }
};
