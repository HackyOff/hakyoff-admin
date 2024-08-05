import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";

interface TabItem {
    label: string;
    content: React.ReactNode;
}

interface TabsComponentProps {
    tabs: TabItem[];
}

const TabsComponent: React.FC<TabsComponentProps> = ({ tabs }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="w-full">
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex} className="">
                <Tab.List className="flex rounded-lg gap-0 tab-items">
                    {tabs.map((tab, index) => (
                        <motion.div
                            key={index}
                            className={`relative px-2 py-2  focus:outline-none w-full tracking-widest ${index === 0 ? 'rounded-l-2xl' : ''
                                } ${index === tabs.length - 1 ? 'rounded-r-2xl' : ''
                                }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Tab
                                className={`w-full h-full ${selectedIndex === index
                                    ? "border-bn font-bold outline-none border-yellow-700 text-yellow-700 dark:text-yellow-500"
                                    : "text-gray-500 bg-slate-10 "
                                    }`}
                            >
                                {tab.label}
                            </Tab>
                            {/* Adicionando um div de transição para o background */}
                            {selectedIndex === index && (
                                <motion.div
                                    className="absolute inset-x-0 bottom-0 h-1 bg-yellow-700"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </motion.div>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-4 tab-content">
                    {tabs.map((tab, index) => (
                        <Tab.Panel
                            key={index}
                            className="relative"
                            style={{
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                            }}
                        >
                            <motion.div
                                initial={index === 0 ? "visible" : "hidden"}
                                animate={selectedIndex === index ? "visible" : "hidden"}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        x: "-100%",
                                    },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            ease: "easeOut",
                                            duration: 0.3,
                                        },
                                    },
                                }}
                                style={{ width: "100%", height: "100%" }}
                            >
                                {tab.content}
                            </motion.div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default TabsComponent;
