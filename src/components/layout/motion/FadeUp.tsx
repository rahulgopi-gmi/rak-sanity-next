"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "motion/react";

interface FadeUpProps {
    children: ReactNode;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: "easeOut" }
    },
};

export function FadeUp({ children }: FadeUpProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            {
                React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return (
                            <motion.div variants={itemVariants}>
                                {child}
                            </motion.div>
                        );
                    }
                    return child;
                })
            }
        </motion.div>
    );
}
