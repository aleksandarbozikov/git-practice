const PRODUCTS = Object.freeze({
	APPLE_MONITOR: 'Apple monitor 24',
	ASUS_MONITOR: 'ASUS Full HD',
	SAMSUNG_GALAXY_S6: 'Samsung galaxy s6',
	NOKIA_LUMIA_1520: 'Nokia lumia 1520',
	NEXUS_6: 'Nexus 6',
	SAMSUNG_GALAXY_S7: 'Samsung galaxy s7',
	IPHONE_6_32GB: 'Iphone 6 32gb',
	SONY_XPERIA_Z5: 'Sony xperia z5',
	HTC_ONE_M9: 'HTC One M9',
	SONY_VAIO_I5: 'Sony vaio i5',
	SONY_VAIO_I7: 'Sony vaio i7',
	MACBOOK_AIR: 'MacBook air',
	DELL_I7_8GB: 'Dell i7 8gb',
	DELL_2017: '2017 Dell 15.6 Inch',
	MACBOOK_PRO: 'MacBook Pro'
});

const CATEGORIES = Object.freeze({
	PHONES: 'Phones',
	LAPTOPS: 'Laptops',
	MONITORS: 'Monitors'
});

const CATEGORY_PRODUCTS = Object.freeze({
	[CATEGORIES.PHONES]: Object.freeze([
		PRODUCTS.SAMSUNG_GALAXY_S6,
		PRODUCTS.NOKIA_LUMIA_1520,
		PRODUCTS.NEXUS_6,
		PRODUCTS.SAMSUNG_GALAXY_S7,
		PRODUCTS.IPHONE_6_32GB,
		PRODUCTS.SONY_XPERIA_Z5,
		PRODUCTS.HTC_ONE_M9
	]),
	[CATEGORIES.LAPTOPS]: Object.freeze([
		PRODUCTS.SONY_VAIO_I5,
		PRODUCTS.SONY_VAIO_I7,
		PRODUCTS.MACBOOK_AIR,
		PRODUCTS.DELL_I7_8GB,
		PRODUCTS.DELL_2017,
		PRODUCTS.MACBOOK_PRO
	]),
	[CATEGORIES.MONITORS]: Object.freeze([
		PRODUCTS.APPLE_MONITOR,
		PRODUCTS.ASUS_MONITOR
	])
});

const NAVIGATION_LINKS = Object.freeze([
	'Home',
	'Contact',
	'About us',
	'Cart',
	'Log in',
	'Sign up'
]);

module.exports = {CATEGORIES, CATEGORY_PRODUCTS, NAVIGATION_LINKS, PRODUCTS};
