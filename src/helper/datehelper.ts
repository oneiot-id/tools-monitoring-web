export function padDate(date: Date | string | number): string{    
    return date.toString().padStart(2, '0');
}