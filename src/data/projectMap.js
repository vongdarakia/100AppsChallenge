import BalloonApp			from '../projects/001/App';
import BinarySwitchApp 		from '../projects/002/App';
import MoneyTickerApp 		from '../projects/003/App';
import ListSearchApp 		from '../projects/004/App';
import MiniMenuApp 			from '../projects/005/App';
import TypingGameApp 		from '../projects/006/App';
import SimpleAnimationApp 	from '../projects/007/App';
import RandomQuotesApp 		from '../projects/008/App';
import LoveMatchApp 		from '../projects/009/App';
import NotToDoListApp 		from '../projects/010/App';
import NavigationMenuApp 	from '../projects/011/App';
import DayCountDownApp 		from '../projects/012/App';
import DiceRollApp 			from '../projects/013/App';
import PortfolioV1App 		from '../projects/014/App';
import GuessPresidentApp	from '../projects/015/App';
import Portfolio			from '../containers/Portfolio';
import BasicDecryptionApp	from '../projects/018/App';

let menu = {
	sides: [
		{
			name: "Marie Curie Fries",
			price: 2.99
		},
	],
	entrees: [
		{
			name: "Einstein Burger",
			price: 10.99
		},
		{
			name: "Elon Burger",
			price: 12.99
		}
	],
	drinks: [
		{
			name: "Grace Hopper Shake",
			price: 5.99
		},
		{
			name: "Lemonade",
			price: 3.99
		}
	]
}

const ProjectMap = {
	1:	{ app: BalloonApp,			props: null },
	2:	{ app: BinarySwitchApp,		props: null },
	3:	{ app: MoneyTickerApp,		props: null },
	4:	{ app: ListSearchApp,		props: null },
	5:	{ app: MiniMenuApp,			props: {menu} },
	6:	{ app: TypingGameApp,		props: null },
	7:	{ app: SimpleAnimationApp,	props: null },
	8:	{ app: RandomQuotesApp,		props: null },
	9:	{ app: LoveMatchApp,		props: null },
	10: { app: NotToDoListApp,		props: null },
	11: { app: NavigationMenuApp,	props: null },
	12: { app: DayCountDownApp,		props: null },
	13: { app: DiceRollApp,			props: null },
	14: { app: PortfolioV1App,		props: null },
	15: { app: GuessPresidentApp,	props: null },
	16: { app: Portfolio,			props: null },
	17: { app: Portfolio,			props: null },
	18: { app: BasicDecryptionApp,	props: null },
};

export {
	ProjectMap
}
