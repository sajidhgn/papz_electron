"use client";
import React, { useState, useEffect, useRef } from 'react'
import Layout from '../../components/layout';
import axios from "axios";
import { GoBackButton } from '../../components/goBackButton';
import finalizeOrder from '../../../lib/finalizeOrder';
import getMacAddress from '../../../lib/getMacAddress';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import PrintBill from '../../../lib/PrintBill';
import { GlobalConfig } from '@/app.config'
import Loader from '../../components/loader';
import Swal from 'sweetalert2'
import FriesLottieAnimation from '../../components/FriesLottieAnimation';
import Image from 'next/image';
import VideoAnimation from '../../components/VideoAnimation';

const SelectPaymentPage = () => {

    const router = useRouter();

    const [totalBill, setTotalBill] = useState(0);
    const [cart, setCart] = useState([]);
    const [mealCart, setMealCart] = useState([]);
    const [dealsCart, setDealsCart] = useState([]);
    const [mainCart, setMainCart] = useState({});
    const [mac, setMac] = useState('');
    const [printers, setPrinters] = useState([]);
    const [machineBill, setMachineBill] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [serial, setSerial] = useState({});
    const [printerList, setPrinterList] = useState([]);
    const [availablePorts, setAvailablePorts] = useState([]);
    const [loadingTextHeading, setLoadingTextHeading] = useState("");
    const [loadingText, setLoadingText] = useState("");
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [loading, setLoading] = useState(true);
    const [videoSrc, setVideoSrc] = useState(null);
    const [orderPreference, setOrderPreference] = useState("");
    const [orderPreferenceSelected, setOrderPreferenceSelected] = useState(false);
    const [showPreferenceModal, setShowPreferenceModal] = useState(false);
    const [handleOkClick, setHandleOkClick] = useState(() => () => { });

    const orderPreferenceRef = useRef(orderPreference);

    const [saleStatus, setSaleStatus] = useState(false);
    const [ipAddress, setIpAddress] = useState("");

    let dataReceived = false;
    useEffect(() => {
        // localStorage.setItem('paymentMethod', JSON.stringify(null));
        // cartInitialization();
        // initializeSerialPort();
        // setLoading(false);

        initialExecution();

        // const fetchMacAddress = async () => {
        //     try {
        //         const mac = await invoke('get_mac_address');
        //         console.log(mac);
        //     } catch (error) {
        //         console.error('Failed to get MAC address:', error);
        //     }
        // };

        // fetchMacAddress();

    }, []);

    const initialExecution = async () => {
        dataReceived = false;
        localStorage.setItem('paymentMethod', JSON.stringify(null));
        cartInitialization();

        let portStatus = await initializeSerialPort();
        setLoading(false);
    };

    const initializeSerialPort = async () => {
        // Importing The Plugins
        // let printer_plugin = await import("tauri-plugin-printer");
        // let serial_plugin = await import("tauri-plugin-serialport-api");

        // const printers = await printer_plugin?.printers(GlobalConfig.printerID);
        // setPrinterList(printers);

        // const available_ports = await serial_plugin.Serialport.available_ports();
        // setAvailablePorts(available_ports);

        // let serialport = new serial_plugin.Serialport({ path: GlobalConfig.porrtName, baudRate: 9600 });
        // setSerial(serialport);

        return true;
    }

    const cartInitialization = () => {

        // Setting The Order Preference
        let orderType = localStorage.getItem('orderType');
        setOrderPreference(orderType);


        const totalBill = JSON.parse(localStorage.getItem('totalBill'));

        const machineBill = totalBill.toFixed(2).padStart(6, '0').replace(/^(\d{3})(\d{2})$/, "$1.$2");

        setMachineBill('#A' + machineBill + '*');
        setTotalBill(totalBill);

        let cartItems = JSON.parse(localStorage.getItem('cart'));

        if (cartItems === null || !cartItems) {
            cartItems = [];
        }
        setCart(cartItems);

        let customMeal = JSON.parse(localStorage.getItem('mealCart'));
        if (customMeal === null || !customMeal) {
            customMeal = [];
        }
        setMealCart(customMeal);

        let dCart = JSON.parse(localStorage.getItem('dealsCart'));
        if (dCart === null || !dCart) {
            dCart = [];
        }
        setDealsCart(dCart);

        const mainCartStructure = {
            single: cartItems,
            meal: customMeal,
            deal: dCart,
        }

        setMainCart(mainCartStructure);
    }

    const clearCart = () => {
        localStorage.setItem("cart", JSON.stringify([]));
        localStorage.setItem("mealCart", JSON.stringify([]));
        localStorage.setItem("dealsCart", JSON.stringify([]));
    }

    const choosePreference = () => {
        return new Promise((resolve) => {
            // Open the modal
            setShowPreferenceModal(true);

            // Define the OK button click handler
            const checkAndCloseModal = () => {
                // Close the modal
                setShowPreferenceModal(false);

                // Resolve the promise with the latest orderPreference from the ref
                resolve(orderPreferenceRef.current);
            };

            // Set the handler for the OK click
            setHandleOkClick(() => checkAndCloseModal);
        });
    };

    const proceedOrderFurther = async (payMethod, payStatus, orderType) => {
        const macAddress = await getMacAddress();

        const orderPlacementStatus = await finalizeOrder(mainCart, macAddress, totalBill, payMethod, payStatus, orderType);

        let paymentStatus;
        if (payStatus == 'paid') {
            paymentStatus = 'PAID';
        } else {
            paymentStatus = 'PENDING PAYMENT';
        }

        if (!orderPlacementStatus.status) {
            return {
                status: false,
                message: orderPlacementStatus.message
            }
        } else {

            // // Print Receipt
            // const tableBodyForSingle = cart.map(product => {
            //     return [
            //         product.product_name.trim(),
            //         product.sprice,
            //         product.quantity.toString(),
            //         (product.quantity * parseFloat(product.sprice)).toFixed(2)
            //     ];
            // });

            // let i = 0;
            // const tableBodyForMeal = mealCart.map(product => {
            //     i++;
            //     return [
            //         'Meal ' + i + '(' + product.main.name + '(' + product.main.selectedSize.size + ')' + '|' + product.side.name + '|' + product.drink.name + ')',
            //         product.sprice,
            //         product.quantity.toString(),
            //         (product.quantity * parseFloat(product.sprice)).toFixed(2),
            //     ];
            // });

            // const tableBodyForDeal = dealsCart.map(product => {
            //     i++;
            //     return [
            //         product.name,
            //         product.sprice,
            //         product.quantity.toString(),
            //         (product.quantity * parseFloat(product.sprice)).toFixed(2),
            //     ];
            // });

            // let tableBody = tableBodyForSingle.concat(tableBodyForMeal, tableBodyForDeal);

            // let subtotal = 0;
            // tableBody.forEach(item => {
            //     subtotal += parseFloat(item[item.length - 1]);
            // });

            // const bill = await PrintBill(tableBody, subtotal, orderPlacementStatus.orderNo, paymentStatus);

            const tableBodyForSingle = cart.map(product => {
                const selectedChoices = product.choices.map(choice => {
                    const selectedOption = choice.choice_options.find(option => option.status === 1);
                    if (selectedOption) {
                        return '\t\t - ' + choice.choice_name + ': ' + selectedOption.option_name;
                    }
                    return null;
                }).filter(choice => choice !== null);

                // Join the selected choices for display
                const choiceText = selectedChoices.length > 0 ? selectedChoices.join(', ') : '';

                return [
                    product.product_name.trim() + ' (' + product.selectedSize.size + ') ' + (choiceText ? '\n' + choiceText : ''),
                    product.sprice,
                    product.quantity.toString(),
                    (product.quantity * parseFloat(product.sprice)).toFixed(2)
                ];
            });

            let i = 0;
            const tableBodyForMeal = mealCart.map(product => {
                i++;

                // Get selected choice option names for the main product
                let selectedChoices = '';
                if (product.main.choices && product.main.choices.length > 0) {
                    selectedChoices = product.main.choices.map(choice => {
                        const selectedOption = choice.choice_options.find(option => option.status === 1); // Assuming status 1 indicates selected
                        return selectedOption ? ` \t - ${choice.choice_name}: ${selectedOption.option_name}` : null; // Adding bullet and indentation
                    }).filter(choice => choice !== null).join('\n'); // Join with newline for each choice
                }

                // Construct the meal description with the specified format
                let mealDescription = 'Meal ' + i + '\n' + product.main.name + ' (' + product.main.selectedSize.size + ')';

                // If there are any selected choices, format them as requested
                if (selectedChoices) {
                    mealDescription += '\n' + selectedChoices; // Add newline and choices with bullet points
                }

                // Append side and drink names
                mealDescription += '\n' + product.side.name + '\n' + product.drink.name;

                return [
                    mealDescription,
                    product.sprice,
                    product.quantity.toString(),
                    (product.quantity * parseFloat(product.sprice)).toFixed(2),
                ];
            });

            const tableBodyForDeal = dealsCart.map(product => {
                i++;
                return [
                    product.name,
                    product.sprice,
                    product.quantity.toString(),
                    (product.quantity * parseFloat(product.sprice)).toFixed(2),
                ];
            });

            let tableBody = tableBodyForSingle.concat(tableBodyForMeal, tableBodyForDeal);

            let subtotal = 0;
            tableBody.forEach(item => {
                subtotal += parseFloat(item[item.length - 1]);
            });

            const bill = await PrintBill(tableBody, subtotal, orderPlacementStatus.orderNo, paymentStatus);
            if (!bill.status) {
                return {
                    status: false,
                    message: bill.message
                }
            } else {
                return {
                    status: true,
                }
            }
        }
    }

    const continueOrder = async (responseString) => {

        const keyValuePairs = responseString.split(',');
        let receivedValue = null;
        keyValuePairs.forEach(pair => {
            const [key, value] = pair.split(':');
            if (key.trim() === 'Rcvd') {
                receivedValue = parseFloat(value);
            }
        });

        if (!responseString.startsWith("Cancel_Bill") && receivedValue != 0) {
            return true;
        } else {
            return false;
        }
    }

    const responseCameFromMachine = async (serialport, data) => {

        // const responseString = await convertAsciiToString(data);
        const responseString = data;
        let OrderContinueStatus = await continueOrder(responseString);

        if (OrderContinueStatus) {

            //Logic to confirm the user about the order eat in perference
            let pref = await choosePreference();
            setOrderPreference(pref);

            setShowCancelButton(false);
            setVideoSrc('/assets/animations/workingOnOrder.webm');
            setLoadingTextHeading("Processing Your Order");
            setLoadingText("This will just take a moment");
            let orderStatus = await proceedOrderFurther("cash", "paid");

            if (!orderStatus.status) {
                // Logic To Return The Money To The User
                await serialport
                    .write('#C99*')
                    .then(async (res) => {
                        await serialport
                            .close()
                            .then((res) => {
                                toast.error(`OOPS! ${orderStatus.message} Cancelling Current Payment`, {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                    transition: Bounce,
                                });
                                setIsLoading(false);
                            })
                    })
            } else {
                await serialport
                    .close()
                    .then((res) => {
                        clearCart();
                        setIsLoading(false);
                        router.push('/home');

                        Swal.fire({
                            title: 'SUCCESS',
                            html: `
                                <strong><i>Your order has been successfully confirmed</i></strong>
                                <div style="font-size:16px;">Please proceed to the counter get your order</div>
                                <div style="font-size:30px;">THANK YOU!</div>
                            `,
                            icon: 'success',
                            timer: 4000,
                            showConfirmButton: false,
                        })
                    })
            }
        }
    }

    const fetchDeviceInfo = async () => {
        try {
            const data = await axios.get(`${GlobalConfig.siteurl}api/v2/device.json`, {
                auth: {
                    username: 'eatstek_admin',
                    password: 'chpshpmngr',
                },
            });
            if (data?.data) {
                toast.success('Connection successful!');
                const response = await axios.post(`${GlobalConfig.siteurl}api/v2/transactions/sale.json`, {
                    amount: totalBill
                })
                if (response?.data?.success == "true") {
                    setSaleStatus(true);
                }
            }

        } catch (err) {
            console.error('Error fetching device info:', err);
            toast.error('Connection failed!');
        }
    };

    const paymentModeSelected = async (pm) => {

        if (!availablePorts.includes(GlobalConfig.porrtName) && pm == 1) {
            setIsLoading(false);
            toast.error('It seems the Cash Deposit Machine is not connected to the system. Please connect the CDM first and try again', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            // If CDM is also connected, proceed the payment further
            if (pm == 0) {
                await fetchDeviceInfo();

                if (!saleStatus) {

                    toast.error(`OOPS! Cancelling Current Payment`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                    setIsLoading(false);
                } else {

                    let pref = await choosePreference();
                    setOrderPreference(pref);

                    setLoadingTextHeading("Putting on the final touches!");
                    setLoadingText("We're making sure everything is just right for you.");
                    setVideoSrc('/assets/animations/workingOnOrder.webm');
                    setIsLoading(true);

                    await proceedOrderFurther("counter", "pending", pref);

                    clearCart();
                    // setIsLoading(false);
                    router.push('/home');

                    Swal.fire({
                        title: 'SUCCESS',
                        html: `
                                <strong><i>Your order has been successfully confirmed</i></strong>
                                <div style="font-size:16px;">Please proceed to the counter get your order</div>
                                <div style="font-size:30px;">THANK YOU!</div>
                            `,
                        icon: 'success',
                        timer: 4000,
                        showConfirmButton: false,
                    })
                }
                setIsLoading(false);
            } else if (pm == 1) {
                try {
                    setIsLoading(true);
                    setLoadingTextHeading("Prepare Your Payment");
                    setLoadingText("Add the payment amount to the cash machine");
                    setShowCancelButton(true);
                    setVideoSrc('/assets/animations/addCash.webm');

                    // if (!serial.isOpen) {
                    //     console.log("Bhai ye to bnd h port");
                    //     await serial.open();
                    // }

                    await serial.open();

                    // Write to the Port
                    await serial.write(machineBill);
                    serial
                        .listen(async (data) => {
                            responseCameFromMachine(serial, data);
                        }, true);

                    serial.read({ timeout: 1 * 1000 });

                } catch (error) {
                    toast.error(error, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            } else {

                //Logic to confirm the user about the order eat in perference
                let pref = await choosePreference();
                setOrderPreference(pref);

                setLoadingTextHeading("Putting on the final touches!");
                setLoadingText("We're making sure everything is just right for you.");
                setVideoSrc('/assets/animations/workingOnOrder.webm');
                setIsLoading(true);

                let orderStatus = await proceedOrderFurther("counter", "pending", pref);
                if (!orderStatus.status) {
                    toast.error(`OOPS! ${orderStatus.message} Cancelling Current Payment`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                    setIsLoading(false);
                } else {
                    clearCart();
                    // setIsLoading(false);
                    router.push('/home');

                    Swal.fire({
                        title: 'SUCCESS',
                        html: `
                                <strong><i>Your order has been successfully confirmed</i></strong>
                                <div style="font-size:16px;">Please proceed to the counter get your order</div>
                                <div style="font-size:30px;">THANK YOU!</div>
                            `,
                        icon: 'success',
                        timer: 4000,
                        showConfirmButton: false,
                    })
                }








                // // Pay At The Counter
                // toast.error('We are not accepting any payments on the counter right now. Try switching to cash either', {
                //     position: "top-center",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                //     transition: Bounce,
                // });
                // setIsLoading(false);
            }
        }

        // Check For Printer First
        // && printerList[0].printer_status == 0
        // if (printerList.length != 0) {
        //     // If printer is connected, check for CDM
        //     if (!availablePorts.includes(GlobalConfig.porrtName)) {
        //         setIsLoading(false);
        //         toast.error('It seems the Cash Deposit Machine is not connected to the system. Please connect the CDM first and try again', {
        //             position: "top-center",
        //             autoClose: 3000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //             transition: Bounce,
        //         });
        //     } else {
        //         // If CDM is also connected, proceed the payment further
        //         if (pm == 0) {
        //             // Activate Card Machine
        //             toast.error('We are not accepting any card payments right now. Try switching to cash either', {
        //                 position: "top-center",
        //                 autoClose: 3000,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //                 theme: "light",
        //                 transition: Bounce,
        //             });
        //             setIsLoading(false);
        //         } else if (pm == 1) {
        //             try {
        //                 setLoadingTextHeading("Add Money");
        //                 setLoadingText("Please add cash to the cash machine");

        //                 console.log(serial);
        //                 if (!serial.isOpen) {
        //                     await serial.open();
        //                 }

        //                 // Write to the Port
        //                 let i = 1;
        //                 await serial.write(machineBill);
        //                 serial
        //                     .listen(async (data) => {
        //                         console.log("Data Received : " + iteration);
        //                         responseCameFromMachine(serial, data);
        //                         i++;
        //                     }, true);

        //                 serial.read({ timeout: 1 * 5000 });

        //             } catch (error) {
        //                 toast.error(error, {
        //                     position: "top-center",
        //                     autoClose: 3000,
        //                     hideProgressBar: false,
        //                     closeOnClick: true,
        //                     pauseOnHover: true,
        //                     draggable: true,
        //                     progress: undefined,
        //                     theme: "light",
        //                     transition: Bounce,
        //                 });
        //             }
        //         } else {
        //             // Pay At The Counter
        //             toast.error('We are not accepting any payments on the counter right now. Try switching to cash either', {
        //                 position: "top-center",
        //                 autoClose: 3000,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //                 theme: "light",
        //                 transition: Bounce,
        //             });
        //             setIsLoading(false);
        //         }
        //     }
        // } else {
        //     setIsLoading(false);
        //     toast.error('It seems the printer is not connected to the system. Please connect the printer first and try again', {
        //         position: "top-center",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //         transition: Bounce,
        //     });
        // }
    }


    const cancelPayment = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this payment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#059669",
            cancelButtonColor: "#F87171",
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                serial
                    .write('#C99*')
                    .then(async (res) => {
                        await serial.close().then((res) => {
                            setIsLoading(false);
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Payment has been cancelled",
                                icon: "success",
                                timer: 4000,
                                showConfirmButton: false,
                            })
                        })
                    })

                // serial
                //     .cancelRead()
                //     .then(async (res) => {
                //         alert("Reading Cancelled");
                //         await serial
                //             .write('#C99*')
                //             .then(async (res) => {
                //                 setIsLoading(false);
                //                 Swal.fire({
                //                     title: "Cancelled!",
                //                     text: "Payment has been cancelled",
                //                     icon: "success",
                //                     timer: 4000,
                //                     showConfirmButton: false,
                //                 })
                //             })
                //     })
            }
        });
    }

    useEffect(() => {
        orderPreferenceRef.current = orderPreference;
    }, [orderPreference]);


    return (
        <div style={{
            backgroundImage: 'url(/assets/images/backgroundInverted.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}>
            {/* PAGE LOADING CHECK */}
            {loading ? (
                <div className="w-full min-h-screen flex flex-col justify-center items-center text-slate-800">
                    <FriesLottieAnimation />
                </div>
            ) : (
                <Layout showNavbar={false}>

                    {showPreferenceModal && (
                        <div
                            className="relative z-10"
                            aria-labelledby="modal-title"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                    <div className="bg-white max-w-3xl">
                                        <div className="flex flex-col overflow-hidden py-6">
                                            <div className="flex-grow overflow-y-auto px-12 py-6">
                                                <div className="flex flex-col w-full gap-4">
                                                    <p className="capitalize text-lg">How would you like to eat?</p>
                                                    <div className="flex gap-8">
                                                        {orderPreference === 'Eat In' ? (
                                                            <>
                                                                <div
                                                                    className="p-4 bg-black text-white flex flex-col items-center shadow-md cursor-pointer"
                                                                    onClick={() => setOrderPreference('Eat In')} // Update orderPreference
                                                                >
                                                                    <Image
                                                                        src={'/assets/images/dinein.png'}
                                                                        className="w-36"
                                                                        width={50}
                                                                        height={50}
                                                                        alt="Dine In Image"
                                                                    />
                                                                    <p className="text-xl">Dine In</p>
                                                                </div>
                                                                <div
                                                                    className="p-4 bg-white flex flex-col items-center shadow-md cursor-pointer"
                                                                    onClick={() => setOrderPreference('Takeaway')} // Update orderPreference
                                                                >
                                                                    <Image
                                                                        src={'/assets/images/takeaway.png'}
                                                                        className="w-36"
                                                                        width={50}
                                                                        height={50}
                                                                        alt="Takeaway Image"
                                                                    />
                                                                    <p className="text-xl">Takeaway</p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div
                                                                    className="p-4 bg-white flex flex-col items-center shadow-md cursor-pointer"
                                                                    onClick={() => setOrderPreference('Eat In')} // Update orderPreference
                                                                >
                                                                    <Image
                                                                        src={'/assets/images/dinein.png'}
                                                                        className="w-36"
                                                                        width={50}
                                                                        height={50}
                                                                        alt="Dine In Image"
                                                                    />
                                                                    <p className="text-xl">Dine In</p>
                                                                </div>
                                                                <div
                                                                    className="p-4 bg-black text-white flex flex-col items-center shadow-md cursor-pointer"
                                                                    onClick={() => setOrderPreference('Takeaway')} // Update orderPreference
                                                                >
                                                                    <Image
                                                                        src={'/assets/images/takeaway.png'}
                                                                        className="w-36"
                                                                        width={50}
                                                                        height={50}
                                                                        alt="Takeaway Image"
                                                                    />
                                                                    <p className="text-xl">Takeaway</p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-4 flex-shrink-0 w-full px-3">
                                                <button
                                                    className="bg-black text-white px-10 py-3 lg:py-4"
                                                    onClick={handleOkClick} // Use the OK handler
                                                >
                                                    OK
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}



                    <div className="main-container min-h-screen  flex flex-col items-center">
                        <ToastContainer stacked />

                        {/* ACTION WAITING TEXT */}
                        {!isLoading ? (
                            <>
                                <div className="w-full flex justify-end items-end">
                                    <GoBackButton iconInvert={true} textColor={'text-slate-200'} />

                                </div>

                                <div className="flex flex-col flex-1 justify-center items-center w-full gap-8">

                                    {/* Heading */}
                                    <div className="flex flex-col gap-3">
                                        <p className="text-3xl text-center lg:text-3xl text-white">
                                            How would you like to pay?
                                        </p>
                                        <p className="text-2xl text-center lg:text-3xl text-white">
                                            Total : <span className="font-semibold">{totalBill.toFixed(2)}</span>
                                        </p>
                                    </div>

                                    {/* Payment Options */}
                                    <div className="flex flex-col items-center gap-5">

                                        <button className="flex flex-col items-center border border-1 border-gray-600 rounded p-10 bg-transparent focus:bg-black focus:border-black w-full" onClick={() => paymentModeSelected(0)}>
                                            <VideoAnimation src={'/assets/animations/payByCard.webm'} />
                                            <div className="text-3xl text-white">Pay By Card</div>
                                        </button>

                                        <div className="flex gap-5">
                                            <button onClick={() => paymentModeSelected(1)} className="flex flex-col items-center border border-1 border-gray-600 rounded p-10 bg-transparent focus:bg-black focus:border-black">
                                                <VideoAnimation src={'/assets/animations/payByCash.webm'} />
                                                <div className="text-3xl text-white">Pay By Cash</div>
                                            </button>

                                            <button onClick={() => paymentModeSelected(2)} className="flex flex-col items-center border border-1 border-gray-600 rounded p-10 bg-transparent focus:bg-black focus:border-black">
                                                <VideoAnimation src={'/assets/animations/payAtCounter.webm'} />
                                                <div className="text-3xl text-white">Pay At Counter</div>
                                            </button>
                                        </div>

                                    </div>

                                    {/* <div className="flex">
                                        <div className="flex flex-col bg-black items-center justify-center px-7 py-4 text-white rounded-lg mx-2 lg:mx-1 cursor-pointer" onClick={() => paymentModeSelected(0)}>
                                            <div className="min-h-20">
                                                <Image src={'/assets/animations/card.gif'} height={50} width={50} alt='Loading....' className='w-24' />
                                            </div>
                                            <p className="">Card</p>
                                        </div>

                                        <div className="flex flex-col bg-black items-center justify-center px-7 py-4 text-white rounded-lg mx-2 lg:mx-1 cursor-pointer" onClick={() => paymentModeSelected(1)}>
                                            <div className="min-h-20">
                                                <Image src={'/assets/animations/cash.gif'} height={50} width={50} alt='Loading....' className='w-24' />
                                            </div>
                                            <p className="">Cash</p>
                                        </div>

                                        <div className="flex flex-col bg-black items-center justify-center px-7 py-4 text-white rounded-lg mx-2 lg:mx-1 cursor-pointer" onClick={() => paymentModeSelected(2)}>
                                            <div className="min-h-20">
                                                <Image src={'/assets/animations/counter.gif'} height={50} width={50} alt='Loading....' className='w-24' />
                                            </div>
                                            <p className="">Pay At Counter</p>
                                        </div>


                                    </div> */}

                                </div>


                            </>
                        ) : (
                            <>
                                <div className="flex flex-1 justify-center items-center">
                                    <div className="text-white flex flex-col">
                                        <Loader text1={loadingTextHeading} text2={loadingText} >
                                            <VideoAnimation src={videoSrc} height={200} />
                                        </Loader>
                                    </div>
                                </div>

                                <div className="p-5">
                                    {showCancelButton &&
                                        <div className="text-white bg-red-400 flex flex-col mt-auto uppercase px-5 py-4 font-semibold cursor-pointer rounded-full" onClick={cancelPayment}>
                                            Cancel Payment
                                        </div>
                                    }
                                </div>
                            </>
                        )}

                    </div>
                </Layout >
            )
            }
        </div >
    )
}

export default SelectPaymentPage