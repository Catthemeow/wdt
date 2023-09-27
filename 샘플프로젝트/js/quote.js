const quotes = [
	{
		msg: 'The way to get started is to quit talking and begin doing.',
		author: 'Walt Disney',
	},
	{
		msg: "Life is what happens when you're busy making other plans.",
		author: 'John Lennon',
	},
	{
		msg: 'The world is a book and those who do not travel read only one page.',
		author: 'Saint Augustine',
	},
	{
		msg: 'Life is either a daring adventure or nothing at all.',
		author: 'Helen Keller',
	},
	{
		msg: 'To Travel is to Live',
		author: 'Hans Christian Andersen',
	},
	{
		msg: 'Only a life lived for others is a life worthwhile.',
		author: 'Albert Einstein',
	},
	{
		msg: 'You only live once, but if you do it right, once is enough.',
		author: 'Mae West',
	},
	{
		msg: 'Never go on trips with anyone you do not love.',
		author: 'Hemmingway',
	},
	{
		msg: 'We wander for distraction, but we travel for fulfillment.',
		author: 'Hilaire Belloc',
	},
	{
		msg: 'Travel expands the mind and fills the gap.',
		author: 'Sheda Savage',
	},
];

const $msg = document.querySelector('.quote>.msg');
const $author = document.querySelector('.quote>.author');

const quote = quotes[Math.floor(Math.random() * quotes.length)];

$msg.textContent = quote.msg;
$author.textContent = quote.author;
