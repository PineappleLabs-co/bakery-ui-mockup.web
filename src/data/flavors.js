const BASE = import.meta.env.BASE_URL.endsWith('/') 
  ? import.meta.env.BASE_URL 
  : `${import.meta.env.BASE_URL}/`;

const asset = (path) => `${BASE}${path.startsWith('/') ? path.slice(1) : path}`;

export const FLAVORS = [
  {
    id: 'pineapple',
    name: 'Pineapple',
    title: 'Pineapple Pie',
    tagline: 'Busting with juicy tropical pineapple flavors. Smooth creamy filling meets flaky crust. A bright, refreshing treat every bite.',
    lines: [
      'Busting with juicy tropical pineapple flavors.',
      'Smooth creamy filling meets flaky crust.',
      'A bright, refreshing treat every bite.'
    ],
    price: 6.50,
    wholePrice: 28.00,
    rating: 4.9,
    reviewCount: 342,
    calories: '360 kcal / slice',
    descriptionFull: 'A sun-drenched tropical classic with juicy sweet pineapple chunks folded into silky vanilla-custard cream, nested in our golden flaky butter crust and topped with a cloud of whipped cream and toasted coconut shreds.',
    ingredients: [
      'Fresh Golden Pineapple',
      'Whipped Coconut Cream',
      'Toasted Coconut Flakes',
      'All-Butter Flaky Crust',
      'Madagascar Bourbon Vanilla'
    ],
    bgColor: '#F4C430',
    blobColor: '#FFE89A',
    accentColor: '#23344C',
    textColor: '#1F2937',
    assets: {
      logo: asset('/assets/pineapple/logo.png'),
      logoSvg: asset('/assets/pineapple/logo.svg'),
      pieGrp: asset('/assets/pineapple/pie GRP.svg'),
      miniSlice: asset('/assets/pineapple/mini slice.png'),
      ingredientsImg: asset('/assets/pineapple/pine ingri.svg'),
      bodyTxt: asset('/assets/pineapple/Body txt.png'),
      blobSvg: asset('/assets/pineapple/blob.svg'),
      blobImg: asset('/assets/pineapple/blob.png'),
      select: asset('/assets/pineapple/select.svg')
    }
  },
  {
    id: 'avocado',
    name: 'Avocado',
    title: 'Avocado Pie',
    tagline: 'Fresh creamy avocado with silky filling. Perfectly balanced with buttery pastry. Smooth, unique, and delightfully refreshing.',
    lines: [
      'Fresh creamy avocado with silky filling.',
      'Perfectly balanced with buttery pastry.',
      'Smooth, unique, and delightfully refreshing.'
    ],
    price: 7.00,
    wholePrice: 30.00,
    rating: 4.8,
    reviewCount: 215,
    calories: '340 kcal / slice',
    descriptionFull: 'Velvety smooth California Hass avocados churned with sweetened cream and a touch of zesty lime on a honey-graham cracker crust, crowned with a dollop of fresh cream and fresh avocado slice.',
    ingredients: [
      'Hass Avocado Purée',
      'Sweetened Condensed Cream',
      'Key Lime Zest',
      'Honey Graham Cracker Crust',
      'Chantilly Whipped Cream'
    ],
    bgColor: '#74A94F',
    blobColor: '#CBEA9E',
    accentColor: '#23344C',
    textColor: '#1F2937',
    assets: {
      logo: asset('/assets/avocado/logo.png'),
      logoSvg: asset('/assets/avocado/logo.svg'),
      pieGrp: asset('/assets/avocado/pie GRP.svg'),
      miniSlice: asset('/assets/avocado/mini slice.png'),
      ingredientsImg: asset('/assets/avocado/ingri avocado.svg'),
      bodyTxt: asset('/assets/avocado/Body txt.png'),
      blobSvg: asset('/assets/avocado/blob.svg'),
      blobImg: asset('/assets/avocado/blob.png'),
      select: asset('/assets/avocado/select.svg')
    }
  },
  {
    id: 'banana',
    name: 'Banana',
    title: 'Banana Pie',
    tagline: "Made with sweet ripe bananas daily. Rich creamy texture with buttery crust. Comforting flavors you'll always crave.",
    lines: [
      'Made with sweet ripe bananas daily. Rich',
      'creamy texture with buttery crust. Comforting',
      "flavors you'll always crave."
    ],
    price: 6.25,
    wholePrice: 27.00,
    rating: 4.9,
    reviewCount: 410,
    calories: '380 kcal / slice',
    descriptionFull: 'Layers of naturally sweet sliced bananas nestled in rich vanilla bean custard, blanketed in cloud-soft whipped cream and finished with buttery caramelized wafer crust.',
    ingredients: [
      'Sweet Ripe Cavendish Bananas',
      'Vanilla Bean Custard',
      'Fresh Sweet Cream Swirls',
      'Salted Caramel Drizzle',
      'Buttery Shortbread Pastry'
    ],
    bgColor: '#F6D34E',
    blobColor: '#FFF1B8',
    accentColor: '#23344C',
    textColor: '#1F2937',
    assets: {
      logo: asset('/assets/banana/logo.png'),
      logoSvg: asset('/assets/banana/logo.svg'),
      pieGrp: asset('/assets/banana/pie GRP.svg'),
      miniSlice: asset('/assets/banana/mini slice.png'),
      ingredientsImg: asset('/assets/banana/banana infri.svg'),
      bodyTxt: asset('/assets/banana/Body txt.png'),
      blobSvg: asset('/assets/banana/blob.svg'),
      blobImg: asset('/assets/banana/blob.png'),
      select: asset('/assets/banana/select.svg')
    }
  },
  {
    id: 'apple',
    name: 'Apple',
    title: 'Apple Pie',
    tagline: 'Filled with juicy cinnamon-spiced apples. Wrapped in a crisp golden crust. Warm, classic goodness in every slice.',
    lines: [
      'Filled with juicy cinnamon-spiced apples.',
      'Wrapped in a crisp golden crust. Warm,',
      'classic goodness in every slice.'
    ],
    price: 6.00,
    wholePrice: 26.00,
    rating: 5.0,
    reviewCount: 520,
    calories: '390 kcal / slice',
    descriptionFull: 'Tender Honeycrisp and Granny Smith apples tossed with fragrant Ceylon cinnamon, nutmeg, and brown sugar, baked inside a golden lattice pastry and served with premium vanilla cream.',
    ingredients: [
      'Honeycrisp & Granny Smith Apples',
      'Ceylon Cinnamon & Spices',
      'Pure Madagascar Vanilla Gelato',
      'Hand-Woven Lattice Flaky Crust',
      'Brown Butter Caramel Glaze'
    ],
    bgColor: '#E54B4B',
    blobColor: '#FFB6A3',
    accentColor: '#23344C',
    textColor: '#1F2937',
    assets: {
      logo: asset('/assets/apple/logo.png'),
      logoSvg: asset('/assets/apple/logo.svg'),
      pieGrp: asset('/assets/apple/pie GRP.svg'),
      miniSlice: asset('/assets/apple/mini slice.png'),
      ingredientsImg: asset('/assets/apple/aple ingri.svg'),
      bodyTxt: asset('/assets/apple/Body txt.png'),
      blobSvg: asset('/assets/apple/blob.svg'),
      blobImg: asset('/assets/apple/blob.png'),
      select: asset('/assets/apple/select.svg')
    }
  }
];
