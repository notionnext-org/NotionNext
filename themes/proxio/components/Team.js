/* eslint-disable @next/next/no-img-element */
import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
/**
 * 作者团队
 * @returns 
 */
export const Team = () => {
    const PROXIO_ABOUT_PHOTO_URL = siteConfig('PROXIO_ABOUT_PHOTO_URL')
    const AUTHOR = siteConfig('AUTHOR')

    return (
        <>
            {/* <!-- ====== Team Section Start --> */}
            <section
                id='team'
                className='proxio-section overflow-hidden pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]'>
                <div className='container mx-auto wow fadeInUp' data-wow-delay='.2s'>
                    <div className='flex flex-col items-center gap-10 md:flex-row md:items-stretch md:justify-between'>
                        {/* 左边肖像图 */}
                        <div className='proxio-card w-full max-w-[420px] overflow-hidden rounded-2xl border md:w-[42%] md:min-h-[520px]'>
                            <LazyImage alt={AUTHOR} src={PROXIO_ABOUT_PHOTO_URL} className='h-full w-full object-cover' />
                        </div>
                        {/* 右侧文字说明 */}
                        <div className='flex flex-col space-y-4 justify-between max-w-[485px]'>
                            <div>
                                <span className='proxio-pill px-3 py-0.5 mb-2 rounded-2xl border'>
                                    {siteConfig('PROXIO_ABOUT_TITLE')}
                                </span>
                            </div>
                            <h2 className='mb-3 text-xl md:text-3xl leading-[1.2] dark:text-white '>
                                {siteConfig('PROXIO_ABOUT_TEXT_1')}
                            </h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: siteConfig('PROXIO_ABOUT_TEXT_2')
                                }}
                                className='text-base text-body-color dark:text-dark-6'></p>
                            {/* 数值四宫格 */}
                            <div className='grid grid-cols-2 grid-rows-2 pt-6 gap-4'>
                                <KeyVal k={siteConfig('PROXIO_ABOUT_KEY_1')} v={siteConfig('PROXIO_ABOUT_VAL_1')} />
                                <KeyVal k={siteConfig('PROXIO_ABOUT_KEY_2')} v={siteConfig('PROXIO_ABOUT_VAL_2')} />
                                <KeyVal k={siteConfig('PROXIO_ABOUT_KEY_3')} v={siteConfig('PROXIO_ABOUT_VAL_3')} />
                                <KeyVal k={siteConfig('PROXIO_ABOUT_KEY_4')} v={siteConfig('PROXIO_ABOUT_VAL_4')} />
                            </div>

                            <div className='mt-8 w-full flex justify-end py-2'>
                                <SmartLink
                                    href={siteConfig('PROXIO_ABOUT_BUTTON_URL', '')}
                                    className='proxio-outline-button px-4 py-2 rounded-3xl border text-base font-medium duration-200'>
                                    {siteConfig('PROXIO_ABOUT_BUTTON_TEXT')}
                                    <i className="pl-4 fa-solid fa-arrow-right"></i>
                                </SmartLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ====== Team Section End --> */}
        </>
    )
}

// 显示一组键值对
const KeyVal = ({ k, v }) => {
    if (!k) {
        return null;
    }
    return (
        <div className='space-y-2'>
            <div className='dark:text-dark-6'>{k}</div>
            <div className='dark:text-white text-2xl font-semibold'>{v}</div>
        </div>
    )
}
