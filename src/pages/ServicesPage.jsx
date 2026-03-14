import { motion } from 'framer-motion';
import Services from '../components/Services';
import FAQ from '../components/FAQ';

const pageVariants = {
    initial: { opacity: 0, y: 200 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -200 }
};

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

export default function ServicesPage() {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            style={{ paddingTop: '80px', minHeight: '100vh' }}
        >
            <Services />
            <FAQ />
        </motion.div>
    );
}
