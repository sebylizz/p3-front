import { motion } from 'framer-motion';

export default function BouncingBall() {
    return (
        <div
            style={{
                width: "2rem",
                height: "2rem",
                display: "flex",
                justifyContent: "center", // Centering the SVG
                alignItems: "flex-end",    // Aligning to the bottom for bouncing effect
            }}
        >
            <motion.div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    width: "100%",
                    height: "100%",
                }}
                transition={bounceTransition}
                animate={{
                    y: ["100%", "-100%"],
                }}
            >
        /*Svg */
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" fill="#FF8C00" />
                    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
                </svg>

            </motion.div>
        </div>
    );
}

const bounceTransition = {
    y: {
        duration: 0.4,
        yoyo: Infinity,
        ease: "easeOut",
    },
}
