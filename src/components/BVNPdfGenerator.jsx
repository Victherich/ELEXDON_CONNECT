


import { jsPDF } from "jspdf";
import slipTemplate from '../Images/bvn_slip.jpg'; // Update with your actual path
import cardTemplate from '../Images/bvn_card.png'; // Update with your actual path

const getImgData = (photo) => photo?.startsWith('data:image') ? photo : `data:image/jpeg;base64,${photo}`;

// Template-specific coordinate configuration for BVN
const TEMPLATES = {
    slip: { 
        img: slipTemplate, 
        bg: [0, 0, 210, 290], // [X, Y, Width, Height] for slip background
        surname: [60, 114], 
        firstname: [60, 93], 
        middlename: [60, 103], 
        gender: [60, 124],
        residentialAddress: [1000, 1000],
        bvn: [72, 71.6], // Adjust X and Y for slip BVN location
        photo: [15, 155], // [X, Y] position of the photo on the slip
        photoSize: [70, 90], // [Width, Height] of the photo on the slip
        dateOfBirth: [60, 134],
        phoneNumber1: [60, 145], // Adjusted Y coordinate example for phone number
        nationality: [1000, 1000],
        email: [1000, 1000],
        enrollmentBank: [1000, 1000],
        enrollmentBranch: [1000, 1000],
        registrationDate: [1000, 1000],
        levelOfAccount: [1000, 1000],
        watchListed: [1000, 1000],
        issuedDate: [120, 23.5],       // <-- Add coordinate for Issued Date
        verification: [55, 23.5],
    },
    card: { 
        img: cardTemplate, 
        bg: [20, 20, 160, 120], // [X, Y, Width, Height] for card background
        surname: [100, 77.5], 
        firstname: [100, 84.5], 
        middlename: [100, 79], 
        gender: [113, 92],
        residentialAddress: [1000, 1000],
        bvn: [69.5, 121],
        photo: [35, 60], // [X, Y] position of the photo on the card
        photoSize: [28, 36], // [Width, Height] of the photo on the card
        dateOfBirth: [76, 92],
        phoneNumber1: [1000, 1000],
        nationality: [1000, 1000],
        email: [1000, 1000],
        enrollmentBank: [1000, 1000],
        enrollmentBranch: [1000, 1000],
        registrationDate: [1000, 1000],
        levelOfAccount: [1000, 1000],
        watchListed: [1000, 1000],
        issuedDate: [145, 101.5],       // <-- Add coordinate for Issued Date
        verification: [1000, 1000],
    }
};

const generateSlip = (profileData, type) => {
    // Safely extract the inner data object depending on structure
    const data = profileData.profile?.data || profileData.data || profileData;
    const config = TEMPLATES[type] || TEMPLATES['slip'];
    // Set orientation to landscape ('l') for card, and portrait ('p') for slip
    const orientation = type === 'card' ? 'l' : 'p';
    const doc = new jsPDF('p', 'mm', 'a4');

    // 1. Add background template
    if (config.img) {
        const [bgX, bgY, bgW, bgH] = config.bg;
        doc.addImage(config.img, 'JPEG', bgX, bgY, bgW, bgH);
    }

    // 2. Add User Photo with independent dimensions
    if (config.photo) {
        const photoBase64 = data.base64Image || data.photo;
        
        if (photoBase64) {
            const base64Data = photoBase64.includes(',') ? photoBase64.split(',')[1] : photoBase64;
            const pWidth = config.photoSize ? config.photoSize[0] : 30;
            const pHeight = config.photoSize ? config.photoSize[1] : 38;
            
            try {
                doc.addImage(`data:image/jpeg;base64,${base64Data}`, 'JPEG', config.photo[0], config.photo[1], pWidth, pHeight);
            } catch (e) {
                console.error("Failed to add image to PDF:", e);
            }
        }
    }

    // 3. Add Data Fields
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    
 // Surname
    if (config.surname && data.lastName) {
        if (type === 'card') {
            const surnameX = config.surname[0];
            const surnameY = config.surname[1];
            const surnameWidth = doc.getTextWidth(data.lastName);
            const centeredSurnameX = surnameX - (surnameWidth / 2);
            doc.text(`${data.lastName}`, centeredSurnameX, surnameY);
        } else {
            doc.text(`${data.lastName}`, config.surname[0], config.surname[1]);
        }
    }

    // Dynamic First & Middle Name Logic
  // Dynamic First & Middle Name Logic (Center-aligned)
    if (type === 'card') {
        const firstX = config.firstname[0];
        const Y = config.firstname[1];
        
        let fullNameToPrint = '';
        if (data.firstName) fullNameToPrint += data.firstName;
        if (data.middleName) fullNameToPrint += (fullNameToPrint ? ' ' : '') + data.middleName;

        if (fullNameToPrint) {
            const totalWidth = doc.getTextWidth(fullNameToPrint);
            const centeredX = firstX - (totalWidth / 2);
            doc.text(fullNameToPrint, centeredX, Y);
        }
    }
     else {
        if (data.firstName) {
            doc.text(`${data.firstName}`, config.firstname[0], config.firstname[1]);
        }
        if (data.middleName && config.middlename) {
            doc.text(`${data.middleName}`, config.middlename[0], config.middlename[1]);
        }
    }

    // Gender
    if (config.gender && data.gender) {
        doc.text(`${data.gender.toUpperCase()}`, config.gender[0], config.gender[1]);
    }

    // Address Handling
    const addressText = data.residentialAddress || data.residence_address || '';
    if (config.residentialAddress && addressText) {
        const maxAddressWidth = 35; 
        const addressLines = doc.splitTextToSize(addressText, maxAddressWidth);
        doc.text(addressLines, config.residentialAddress[0], config.residentialAddress[1]);
    }

    // Date of Birth
    if (config.dateOfBirth && config.dateOfBirth[0] !== 1000 && data.dateOfBirth) {
        doc.text(`${data.dateOfBirth}`, config.dateOfBirth[0], config.dateOfBirth[1]);
    }

    // Phone Number
    if (config.phoneNumber1 && config.phoneNumber1[0] !== 1000 && (data.phoneNumber1 || data.phone || data.mobile)) {
        const phone = data.phoneNumber1 || data.phone || data.mobile;
        doc.text(`${phone}`, config.phoneNumber1[0], config.phoneNumber1[1]);
    }

    // 4. BVN Field Formatting
    const rawBvn = String(data.bvn || '');
    
    if (type === 'card') {
        doc.setFontSize(20); 
        doc.setTextColor(0, 0, 0); 
        
        const cleanBvn = rawBvn.replace(/\s+/g, '');
        const part1 = cleanBvn.slice(0, 4); 
        const part2 = cleanBvn.slice(4, 7); 
        const part3 = cleanBvn.slice(7, 11);

        let currentX = config.bvn[0];
        const yCoord = config.bvn[1];
        
        const letterSpacing = 0.8; 
        const groupGap = 6;        

        const drawSpacedText = (text) => {
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                doc.text(char, currentX, yCoord);
                currentX += doc.getTextWidth(char) + letterSpacing;
            }
        };

        drawSpacedText(part1);
        currentX += groupGap - letterSpacing; 
        drawSpacedText(part2);
        currentX += groupGap - letterSpacing; 
        drawSpacedText(part3);

    } else {
        // Matched slip font size to the rest of the text size (9) so it isn't smaller
        doc.setFontSize(10);
        doc.text(rawBvn, config.bvn[0], config.bvn[1]);
    }


    // 5. Issued Date (Current Date & Time) & Verification Field
  // Issued Date Logic
    if (config.issuedDate && config.issuedDate[0] !== 1000) {
        if (type === 'card') {
            // Card: Date only, reduced font
            const currentDate = new Date().toLocaleDateString();
            doc.setFontSize(9);
            doc.text(currentDate, config.issuedDate[0], config.issuedDate[1]);
            doc.setFontSize(10); // Reset font size
        } else {
            // Slip: Full date and time, standard font
            const currentDateTime = new Date().toLocaleString();
            doc.text(currentDateTime, config.issuedDate[0], config.issuedDate[1]);
        }
    }

    if (config.verification && config.verification[0] !== 1000) {
        doc.setFont(undefined, 'normal');
        doc.text("Verification", config.verification[0], config.verification[1]);
    }

    doc.save(`BVN_${type}.pdf`);
};

export const downloadSlip2 = (slipType, profile) => {
    generateSlip(profile, slipType || 'slip');
};