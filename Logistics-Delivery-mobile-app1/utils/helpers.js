export function getStatusColor(status) {
  const colors = {
    'pending': '$yellow400',
    'picked-up': '$blue400',
    'in-transit': '$blue500',
    'out-for-delivery': '$orange500',
    'delivered': '$green500',
    'cancelled': '$red500',
  };
  return colors[status] || '$gray400';
}

export function getStatusIcon(status) {
  const icons = {
    'pending': 'time',
    'picked-up': 'checkmark-circle',
    'in-transit': 'navigate',
    'out-for-delivery': 'car',
    'delivered': 'checkmark-done-circle',
    'cancelled': 'close-circle',
  };
  return icons[status] || 'alert-circle';
}

export function getStatusLabel(status) {
  return status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1);
}
