import { jsPDF } from "jspdf";
import regTemplate from '../Images/nin_regular.png';
import stdTemplate from '../Images/nin_standard.png';
import premTemplate from '../Images/nin_premium.png';

const getImgData = (photo) => photo?.startsWith('data:image') ? photo : `data:image/jpeg;base64,${photo}`;

// Template-specific coordinate configuration
const TEMPLATES = {
    nin_regular: { 
        img: regTemplate, 
        bg: [0, 0, 210, 99],
        surname: [103, 31], 
        firstname: [103, 41], 
        middlename: [103, 51], 
        gender: [103, 61],
        residence_address: [130, 35],
        residence_AdressLine1: [130, 35],
        nin: [38, 41] ,
       photo: [169, 27.5],
       photoSize:[30,38],
       birthdate:[1000,1000],
       issuedate: [1000, 1000]
    },
    nin_standard: { 
        img: stdTemplate, 
           bg: [50, 50, 101, 120],
        surname: [79.1, 71], 
        firstname: [79.1, 79.5], 
        middlename: [100, 79], 
        gender: [1000, 1000],
        residence_address: [1000, 1000],
        residence_AdressLine1: [1000, 1000],
        nin: [69.5, 104],
       photo: [51, 60],
       photoSize:[24,30],
       birthdate:[79.1,88],
       issuedate: [1000, 1000]
    },
    nin_premium: { 
        img: premTemplate, 
           bg: [50, 50, 101, 120],
        surname: [77, 72], 
        firstname: [77, 80.5], 
        middlename: [100, 79], 
        gender: [107, 88.5],
        residence_address: [1000, 1000],
        residence_AdressLine1: [1000, 1000],
        nin: [69.5, 107],
       photo: [51, 63],
       photoSize:[24,30],
       birthdate:[77,88.5],
       issuedate: [128, 93]
    }
};



const generateSlip = (profile, type) => {
    const config = TEMPLATES[type];
    const doc = new jsPDF('p', 'mm', 'a4');

    // 1. Add background
    const [bgX, bgY, bgW, bgH] = config.bg;
    doc.addImage(config.img, 'JPEG', bgX, bgY, bgW, bgH);


 // 2. Add User Photo
if (config.photo) {
    const photoData = profile.data.photo;
    
    if (photoData) {
        const base64Data = photoData.includes(',') ? photoData.split(',')[1] : photoData;
        
        // Use defined sizes, or default to [30, 38] if not provided
        const pWidth = config.photoSize ? config.photoSize[0] : 30;
        const pHeight = config.photoSize ? config.photoSize[1] : 38;
        
        try {
            doc.addImage(base64Data, 'JPEG', config.photo[0], config.photo[1], pWidth, pHeight);
        } catch (e) {
            console.error("Failed to add image to PDF:", e);
        }
    }
}

    // 3. Add Data Fields
    doc.setFontSize(8);
    
    // Surname
    if (config.surname) {
        doc.text(`${profile.data.surname}`, config.surname[0], config.surname[1]);
    }

    // Dynamic Middle Name Logic
    if (type === 'nin_standard' || type === 'nin_premium') {
        // --- DYNAMIC SIDE-BY-SIDE ---
        const firstX = config.firstname[0];
        const Y = config.firstname[1];
        
        doc.text(`${profile.data.firstname}`, firstX, Y);
        
        // Calculate dynamic X for middlename based on firstname width
        const firstNameWidth = doc.getTextWidth(profile.data.firstname);
        const middleX = firstX + firstNameWidth + 2; // 2mm padding
        
        doc.text(`${profile.data.middlename}`, middleX, Y);
    } else {
        // --- REGULAR SLIP: Static ---
        doc.text(`${profile.data.firstname}`, config.firstname[0], config.firstname[1]);
        doc.text(`${profile.data.middlename}`, config.middlename[0], config.middlename[1]);
    }

    // Gender
    if (config.gender) {
        doc.text(`${profile.data.gender.toUpperCase()}`, config.gender[0], config.gender[1]);
    }

    // Address Handling
    const maxAddressWidth = 35; 
    const addressLines = doc.splitTextToSize(profile.data.residence_address || '', maxAddressWidth);
    doc.text(addressLines, config.residence_address[0], config.residence_address[1]);

    const addressLines2 = doc.splitTextToSize(profile.data.residence_AdressLine1 || '', maxAddressWidth);
    doc.text(addressLines2, config.residence_AdressLine1[0], config.residence_AdressLine1[1]);

       doc.text(`${profile.data.birthdate}`, config.birthdate[0], config.birthdate[1]);

// --- GENERATE CURRENT ISSUE DATE ---
    if (config.issuedate && (type === 'nin_premium')) {
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        
        // Generates current date in format: DD-MM-YYYY (e.g., 20-07-2026)
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedCurrentDate = `${day}-${month}-${year}`;

        doc.text(formattedCurrentDate, config.issuedate[0], config.issuedate[1]);
    }






// 4. NIN Field Formatting & Font Size
    const rawNin = String(profile.data.nin || '');
    
    if (type === 'nin_standard' || type === 'nin_premium') {

         doc.setFontSize(6); 
        doc.setTextColor(150, 150, 150);
        doc.text(rawNin, 142, 63.5, { angle: 180 });

// --- 1. RENDER WATERMARKS (The areas circled in red) ---
        doc.setFontSize(10); // Smaller font size for background watermarks
        
        // Optional: Set text color to a lighter/faded gray if supported, or leave as default
        doc.setTextColor(150, 150, 150); 

        // Top-left watermark (over photo/birthdate area)
        doc.text(rawNin, 58, 95, { angle: 30 });

        // Bottom-left diagonal watermark (near bottom edge)
        doc.text(rawNin, 52, 110, { angle: 35 });

        // Bottom-right diagonal watermark (near QR code)
        doc.text(rawNin, 132, 95, { angle: -45 });








        doc.setFontSize(20); // Increased font size for standard/premium NIN
doc.setTextColor(0, 0, 0); 
        // Clean any spaces and split into chunks
        const cleanNin = rawNin.replace(/\s+/g, '');
        const part1 = cleanNin.slice(0, 4);  // e.g. "7337"
        const part2 = cleanNin.slice(4, 7);  // e.g. "234"
        const part3 = cleanNin.slice(7, 12); // e.g. "3008"

        let currentX = config.nin[0];
        const yCoord = config.nin[1];
        
        const letterSpacing = 0.8; // Gap between individual characters inside a part (adjust as needed)
        const groupGap = 6;        // Gap between the separate groups (part 1, part 2, part 3)

        // Helper function to draw a string character by character with custom letter spacing
        const drawSpacedText = (text) => {
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                doc.text(char, currentX, yCoord);
                currentX += doc.getTextWidth(char) + letterSpacing;
            }
        };

        // Print part 1 character by character
        drawSpacedText(part1);
        currentX += groupGap - letterSpacing; // Add extra space between groups

        // Print part 2 character by character
        drawSpacedText(part2);
        currentX += groupGap - letterSpacing; // Add extra space between groups

        // Print part 3 character by character
        drawSpacedText(part3);

    } else {
        // Regular slip formatting (default behavior)
        doc.setFontSize(8);
        doc.text(rawNin, config.nin[0], config.nin[1]);
    }

    doc.save(`NIN_${type}.pdf`);
};


export const downloadSlip = (slipType, profile) => {
    generateSlip(profile, slipType || 'nin_regular');
};