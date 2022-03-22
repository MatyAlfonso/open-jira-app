import { formatDistanceToNow } from 'date-fns';

export const getFomatDistanceToNow = (date: number) => {
    const fromNow = formatDistanceToNow(date);

    return fromNow;
};