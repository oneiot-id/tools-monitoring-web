export default interface INavButton{
    activeIcon: string;
    unactiveIcon: string;
    nav: string;
    selected: boolean;
    setIndex: () => void;
}