import type React from 'react';
import { Indicator } from '@mantine/core';
import classes from './style.module.css'

interface HighlightedDayProps {
    date: Date;
    currentDate: Date;
    dateEvents: any[];
    indicatorColor: string;
	selectedDate: Date
}

const HighlightedDay: React.FC<HighlightedDayProps> = ({ date, currentDate, dateEvents, indicatorColor, selectedDate }) => {
    const isToday = date.toDateString() === currentDate.toDateString();

	const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
    // const backgroundColor = isToday && !isSelected ? 'var(--mantine-color-yellow-1)' : '';
    // const backgroundColor = isToday ? 'var(--mantine-color-orange-3)' : '';
	const backgroundColor = isSelected && isToday
    // ? 'light-dark(var(--mantine-color-orange-3), #ffc078d4)' 
    // ? 'light-dark(var(--mantine-color-orange-3), #016274)' 
    // ? 'light-dark(var(--mantine-color-yellow-5), #e67700bf)' 
    ? '' 
    : (isToday ? 'light-dark(var(--mantine-color-yellow-2), #5c98d463)' : '');
    // : (isToday ? '#ffec996b' : '');
	return (
        <div style={{ position: 'relative', 
		// backgroundColor: backgroundColor, 
        minWidth:'0.5rem',
		borderRadius: '0.25rem',padding: '0.1rem', paddingRight:'0.23rem', paddingLeft:'0.23rem' }}
			className={isToday && !isSelected?classes.currentDay:''}
		>
            {dateEvents.length > 0 && (
                <Indicator size={6} color={indicatorColor} offset={-1} >
                    <div>{date.getDate()}</div>
                    {/* <div>{date.getDate()}</div> */}
                </Indicator>
            )}
            {!dateEvents.length && <div>{date.getDate()}</div>}
        </div>
    );
};

export default HighlightedDay;
