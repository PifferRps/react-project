import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';

interface TeamEmployeesModalProps {
    title: string;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function TeamEmployeesModal({
                                               title,
                                               open,
                                               onClose,
                                               children,
                                           }: TeamEmployeesModalProps) {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
                                    <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                                        {title}
                                    </Dialog.Title>
                                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-4 space-y-4">{children}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
