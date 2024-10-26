import { GlobalConfig } from '@/app.config'
const PrintBill = async (products, subTotal, orderNo, paymentStatus) => {

    // const { printers, print } = await import("tauri-plugin-printer");

    try {
        const now = new Date();
        const data = [
            // Title
            {
                type: 'text',
                value: 'PAPAZ PIZZA LTD',
                style: {
                    fontWeight: "700",
                    textAlign: 'center',
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                }
            },

            // Address
            {
                type: 'text',
                value: '433 Bordesley Green <br> Birmingham <br> B9 5RA',
                style: {
                    // fontSize: "15px",
                    textAlign: "center",
                }
            }, {
                type: 'text',
                value: '07481-459319',
                style: {
                    // fontSize: "15px",
                    textAlign: "center",
                    marginBottom: '15px',
                }
            },

            // Payment Status
            {
                type: 'text',
                value: paymentStatus,
                style: {
                    fontWeight: "700",
                    textAlign: 'center',
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                }
            },

            // Single Products
            {
                type: 'table',
                style: {
                    width: '100%',
                    cellSpacing: '15px',
                    fontFamily: 'sans-serif',
                    // fontSize: '14px',
                    paddingBottom: '15px',
                    paddingTop: '15px',
                },
                tableHeader: ['Name', 'Price', 'Qty', 'Total'],

                tableBody: products,

                tableHeaderStyle: { backgroundColor: '#000', color: 'white' },
            },

            // HR
            {
                type: 'text',
                style: {
                    marginTop: "10px",
                    marginBottom: "10px",
                    borderTop: '1px dashed',
                }
            },

            // SubTotal and Tax
            {
                type: 'table',
                style: {
                    width: '70%',
                    // cellSpacing: '15px',
                    fontFamily: 'sans-serif',
                    marginLeft: 'auto',
                    marginRight: '10px',
                    textAlign: 'right',
                    marginTop: '0px',
                    paddingTop: '0px',
                },

                tableBody: [
                    [
                        'Subtotal',
                        subTotal,
                    ],
                    // [
                    //     'Tax - 10%',
                    //     '100.00',
                    // ],
                ],
            },

            // HR
            // {
            //     type: 'text',
            //     style: {
            //         borderTop: "1px solid #000",
            //         marginTop: "10px",
            //         marginBottom: "10px",
            //     }
            // },

            // GrandTotal
            {
                type: 'table',
                style: {
                    width: '70%',
                    cellSpacing: '15px',
                    fontSize: '16px',
                    fontWeight: '700',
                    marginLeft: 'auto',
                    marginRight: '10px',
                    marginTop: '0px',
                    textAlign: 'right',
                },

                tableBody: [
                    [
                        'GRAND TOTAL',
                        subTotal,
                    ],
                ],
            },

            // HR
            {
                type: 'text',
                style: {
                    borderTop: "1px solid #000",
                    paddingTop: "30px",
                    marginTop: "10px",
                    marginBottom: '5px',
                }
            },

            // Order Number
            {
                type: 'text',
                value: 'Your Order Number is',
                style: {
                    textAlign: 'center',
                    fontFamily: "sans-serif",
                    fontSize: '15px',
                }
            }, {
                type: 'text',
                value: orderNo,
                style: {
                    fontWeight: "700",
                    textAlign: 'center',
                    fontSize: "22px",
                    fontFamily: "sans-serif",
                }
            },

            // Thank You
            {
                type: 'text',
                value: 'THANK YOU',
                style: {
                    fontWeight: "700",
                    textAlign: 'center',
                    fontSize: "13px",
                }
            },

            // Dashed HR
            {
                type: 'text',
                style: {
                    borderTop: "1px dashed #000",
                    marginTop: "10px",
                    marginBottom: "10px",
                }
            },

            // Day Date Time
            {
                type: 'table',
                style: {
                    width: '100%',
                    cellSpacing: '33.33%',
                    fontWeight: '700',
                    marginLeft: 'auto',
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                },

                tableBody: [
                    [
                        getDate(now),
                        getDay(now),
                        getTime(now),
                    ],
                ],
            },

            // Dashed HR
            {
                type: 'text',
                style: {
                    borderTop: "1px dashed #000",
                    marginTop: "10px",
                }
            },
        ]

        let pid = GlobalConfig.printerID;

        // Print The Page
        // await print(data, {
        //     id: pid,
        //     preview: false,
        //     page_size: {
        //         width: 300, // unit px
        //         heigth: 400 // unit px
        //     },
        //     print_setting: {
        //         orientation: "portrait",
        //         method: "simplex", // duplex | simplex | duplexshort
        //         paper: "A4", // "A2" | "A3" | "A4" | "A5" | "A6" | "letter" | "legal" | "tabloid"
        //         scale: "fit", //"noscale" | "shrink" | "fit"
        //         repeat: 1, // total copies,
        //         // range: "1,2,3"    // print page 1,2,3 
        //         range: {        // print page 1 - 3
        //             from: 1,
        //             to: 3
        //         }
        //     },
        //     remove_temp: true,
        // })

        return {
            status: true,
        }

    } catch (error) {
        return {
            status: false,
            message: error,
        }
    }
}

const getDate = (now) => {
    // Get the date (1-31)
    const date = now.getDate();

    // Get the month (0-11, where 0 is January and 11 is December)
    const month = now.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index

    // Get the year (four digits)
    const year = now.getFullYear();

    return `${date}/${month}/${year}`;
}

const getTime = (now) => {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
}

const getDay = (now) => {
    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return weekdayNames[now.getDay()];
}

export default PrintBill