// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from "@chakra-ui/react";
import { submitTransaction } from "@gemwallet/api";
import { isInstalled, signMessage } from "@gemwallet/api";
import navImage from 'assets/img/layout/Navbar.png';


export default function NFT(props) {
  const { location, description, category, total_amount, type_retailer, retailer_address, document1, issuer, amount_left } = props;
  const [like, setLike] = useState(true);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');

  console.log(issuer)
  const path = "D:\\UCL\\Delft Hackathon\\Delft_Charity_platform\\HACK_DELFT\\backend\\flow.png";
  const concatenatedString = "./flow.png";
  console.log(document1)
  const imagePath = "D:\\UCL\\Delft Hackathon\\Delft_Charity_platform\\HACK_DELFT\\frontend\\public\\XRPLoyaltiesLogo.png"
  const handleConnect = () => {
        signMessage("Sign transaction").then((response) => {
          console.log("Signed message: ", response.result?.signedMessage);
        });

  };

  const handleOpen = () => {
        setIsOpen(true);
    }
    const handleClose = () => {
        setIsOpen(false);
    }

    const handleSubmit = async () => {
        try {
        const response = await fetch('http://127.0.0.1:8000/api/transact/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed, like authentication tokens
            },
            body: JSON.stringify({
    amount: amount,
    address: { issuer }
}) // Send the amount as JSON data
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData); // Log the response data from the server

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }

        handleConnect();
        handleClose();
    }
  return (
      <div onClick={handleOpen} style={{ cursor: 'pointer' }}>
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
        <Image src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhUTEhMVFRIWFhgYGBYXGBUYGhcVGB0ZHRcXGBcYHSggGRolGxgVITEiJykrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0mHyUvLS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABCEAACAQIDBAcFBAkDBAMAAAABAgADEQQSIQUxQVEGEyJhcYGRBzKhscFCUnLRFCMzU2KCsuHwJJLCFjRDonPS8f/EABoBAQADAQEBAAAAAAAAAAAAAAACAwQBBQb/xAAvEQACAQMCBQIEBwEBAAAAAAAAAQIDESESMQQTQVFhcfAikaHBFCMygbHR4fFC/9oADAMBAAIRAxEAPwDuMREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEj8RtSmugux7rfMzxtqsQoUfa3+AkNNNGgpLVIhKVsIncJtOnUOXVW+63HwI0M9VNpUgbXv4C/wAZXiB6T1LXwsLkdbLDQx9NzYHtcjoT4c/Kbcp7rfdoRqCOB4GWTZmJ6ykrneRr4jQymtR0LUtiUZXwbkREzkxERAEREAREQBERAEREAREQBERAEREAREQBERAEREARE1doYrqkL5S1uA/zdOpNuyBskifZTcZjutJfUC2gJ3Wlh2Njetp3ylbdnU3vbjeX1OHlTjqf7+CEZpuxIxETOTEREAiduUzZW5XB85Ey1OoIsdQZAY/BGmbjVDu7u4zZw9VW0MrmupqRE8kgandNZA+VHsCTwk7sGkVoIDvN29SSPhIzZmzjVIeoLUx7q/e7z3SyATJxNRW0L9/6JwXU+xETGWCJCbX2lWpOAiArYakNv10uDNH/AKixH7tfRvzmiHC1JxUlb5kHUSdi0xKt/wBRYj92vo35yY2PiqlVC1RcpvpYEXFhrr4mcqcPOmtUhGaeESMREoJiIiAIiIAiIgCIiAIiIAiIgCIiAIiIBjqkhSRqbG3jwkPU2hV1VlXkRY+Y3yckBiffb8R+cvoJNtNEZMh/0cXya87SZw+NqKFREUAWAFj+c0v/ACeU2qB7afiE21LStqz1K442J2mSQL6Gwv4zJIza+3MJhQDia9KiG93rHVc1rXygm5tcbpvUqisoZSGVgCCDcEHUEEbxaeWXGWIiAJHNjKbVTRsWOW7ch3Hv/tM+PxS0qbO25R6ngPWRfRigcjVm1eqST4An63+Ei27pIvp01y5VJei8t/0s/IwbQw3Vn+E7j9D3z1s3Z5qkO4/V71X73ee6TtakrizAMORF9RMomv8AEvTZb9zLoV/Bo4THo9SpTtlamdx4j7w7v7Tflc2mwpYylU3CoMjfAX+K+kscyRe6Zqr01FRlHaS+qw/qhET5eSKCN257q/i+hkWlMWknt33V/F9DIhHtN1BXplUtz7XAGssOzv2afgX5SrYipeWnZ/7NPwL8pzio2gvX7M7Dc2YmgNq4brDS66n1q70zrmF7EXW9xoy+om/MRbYREQcEREAREQBERAEREAREQBERAEj9tbUpYWhUr1TanTW559wA4kmwHjJCc09o+08TiGGBwVF3ZHpvWqkAU1y9pUu1gxvlYjutx06lce+/v3ksHQ7pemPzDqalFgocK+U56bEgMCO8ajvHAyRr4dyzEKd5lC2SmNTaWGqog/RO3SqMCNMy37QJvowpm9p1YTtOpZal1LeJo8qo6d3jrtfGStnCVc98jWtymXD4ep1ikoQMw4SddgBcmwHGa36dTKsysGy6G3Pl8Zc+JdtkUqk3scz9s2weseji2Cmki9U2a5yEksGy23Hdca6CXDof/ptn4alUN3FIdkWuFNyq8rBSBfumr0kpnF0TSdiqEqeyBfsm4Gs2sLQCqFG5QFHHQAAC/cLCU8PBTbl0Laz0wUeufl7uSJ2s33F/3f2mzhtoKxsRlY8DuPgZCVMQQTYdlbht3w8JldRbu/zWa3Qi1tYza2Y+mjtlRdchJJPC43D4mSXR7EI1BAh91QCOINtZhwGIXErVo1UN6ZCm+5lIurqfUeKmUfpY1fAuvVVCrE3Vh9pNbhhuOttPCYY05OrZdcfL/h6aqU58Ly3hxyvN/vnY3/aTsitVq0XWtiEpZGVlp1SillOZCQN51bXuFpZuhVKsuCorXdnqKGGdzdmXM3VknicmXWc3xXTbFVUCVVpsoN+yCjEjcb3ItqdLRjOnOPdMgdaYta9NbNb8RJt4i01R4Ss5Wdrevt/QzTnS5MbL47u++3Tw/tbyXfpjikZkQG7Lmv3Xtp46SybOcmlTLaMUW9+dpUej2EXq0xD9oN+zXfmI+03cDJeqzPqxv8vITPRoSk3J4Ro42rTjCNCGdPX1zZFhDDnOY+2DbeIVqGEw1apReor1XakWV8q2VAGXUAsWJ1+zbjLX1VtRv7rg+srvTnZi4igWNEVK9Mfq6lyrotwXW4964voZbUoNRbi7mOjJOaUluzN7Jtt1cXhXp4thVrYeoELnUujKGRmuPe1Zf5ed5axXw/WGmUAcW3rvuL6Sp9BsfhMLRFM0hSqNY1HUXFR/vMd9/hvlh6WYbPh2qUxepTGZWG/KNTYju1HeJRCblZRZoqUOVNqtFpZs/T+fTcmP0Gj+7X0EzIgAsBYDhILovt1a9DM7BXp6VLkAdz9wPzvI7bHTqlTOWivWni1yq+Wl2+XfL+VVlJxy7GPXFJPuQXSzo2jYuoxpr+tyldTckgBiBe2bNc+d50XAoy00De8FUHjqAL68dZzPGdKKlV1qsqh6Z7GUaDcdbm+8CWboz0vOIqCjUphXINmU6EgX1B1GgPEyH4WpHVJo11+Kp1KdKMXlJ339P4yW+IiQM4iIgCIiAIiIAiIgCIiAIiIBgxVXIpb/AC/CV9mN8x4nf3jfJfatJ2UZdQDqPlIjFucqgqbrfQXu1+6Qk+5v4WK0467nwIqjsiwJLHxO+bmzsZk0b3fkZHriMwAKOtgfeFgfOTr4FHCkaGw1HEWnI5yiyu1Faai3NPEIcQclytIEE24gcD4zbq4NVpFKagC2gHE6ep0m5QohRYT2ZPSjDOq3aMf0rZff1Ob7O6U0a1bqVSora++FFyu8WBJB0PoZZl+v95zPplSOH2hUq0t3WZ92gc+8D47/AOaWPYXTOhUAWqeqf+I9g+DcPOW8NNQvTlh7q/W/v97k+IpOaVWmrq3TNvf2J+o4GZlbKwOqm2p8O+bZOnlMFKvTezqVa3FWUj1BmejTaobL68B334mbm1a5gSN/Yy6OebW9BPHSPZtCtQcVkDBVZgeKkAm6ngZIYeiEUKNw/wAvNTb9/wBFr2Fz1NSwHMqZhcnKd13LUrI4GJI9HaNN8VQSqM1Nqiqw3XubAad9prjZ9b90/wDtb8ptbOwWIWvRYUqnZq02JykWAYE757M8ppFepdzrmNUB8qgKqKqqBoADyHDTSaGOxRSwAHnJPadMipm4MB6j8xNHEUFca7+B5TFRcbRb2t7+pyd7s0BtB8wPDlJKstxNPCYEhrtw3d/fNnFVgqlmIAA3mXTcbrSRV7ZKgcEzPVVNerVnI/hUgH4Nfyly6G4/rKBptq1PTXih936jyEpuAx1RndsP2mqBk7IubXBIHoNZbuiewqlEmpU0LLlCDWwuDdu/TdPn6f6/hWM/LofU8fb8Pao1fDXe9s/tuV/aXQrEiqwogGixuCWAAHBWG827gZ52z0aGHw6vVcMc2Xsra1wbWN+1u4gb50uUr2pYxKeGphjbNVHwVvznpqtKpKMZO2d9vqfOx/KvKKvdbPKfi3tro0znrmXD2cYLNWeqd1Nco/E/H0B9ZQhtJOdx4GdE9lFcOuIIOman8mmziKsXSelr2zLSi1JXOgRETyjYIiIAiIgCIiAIiIAiJ4drAnkIB7mKpVUEAm19B4z5Qrq4up/OR23j7nn9JOENU9LIt2VyWnLfadi2OKRASAlIHfxYm/wC+kv+y8dm7De8Nx5j85zv2nLbGA86KH4uPpNHDQca1n2YvdXKlXrudCzEciTO0dCsT1mBw7cqYQ+NMlD/AEzjOLwrKtNz7tRSV/lZlI9R8ROmey6vnwdSmT7lRgPwsqn5lpo4tJ00+z/wLcudKqraqQZ7MjNnDJnL6AEDXnJFGBFxuM8+cdLxsdi7o5p0gS2Jrd7mQeLwdJt6L6W+UsfSlbYqr4qfVVmriMDfCisN61Sp/CVW3x+c9iLi6cdXW38HnPVGUnF232wZOgOwcM1ZnOcPTysoDHKQbg5hx4TpaqBunOug2Iy4oL99GXzHa/4mdGnl8TTjTqWirI3Uas6kbzd35PCVVJIBBI3zBtX9jU/A3ymts2mVZy2gGlzz/wA+cz7XP6ip+EyGlRqJLwdbvFlKp7xM9phooWYKN5IA8SZmM9Z7nlrYutakrrY7j/lxK+4qLW6rq6hFrrUC9gjiCwuAfG1+F5YMM10U81B+E9qwN7cND4zyIzlDCPWsnkruJzopdlYKN97Dfp85WdqBMSVFQEotyFuQCe8DfLV0xr2pKn3mv5L/AHIle2Vg8/WNwpoW8+H19IqVnJaehbSgo/H1M+wwKdWmEAAzBbAWFjpw8ZepR9kLevTH8QPpr9Jc1rqWK37QlaRye5qYTGl3I0tw7pQfbbU7OFXm1U+gQf8AIy900WjmZjvJCgcpzj2yVg74S27JVPxQfSXTSveKwU9MnPgJ172P4EphHqEftKpK96qAt/XNOV7NwL16qUU9+owUd195PcBc+U/QuzsGmHopSXRKagDwA1J7zv8AORkIm7E+AzFXrBBc/wD6ZBK+CZlvPsisBXLVSTxHy5SQqVVG8gaga8zuEnODi7HE7mWIiQOiIiAIiIAnwz7IbFYurQe79qiToeK34d/nJwg5uy3ON2yzVa6sbGxBjHVmqBb2ut/O9vynrE1VZiyEFW1/O/IzAzWBvpbj9ZuWbN7lL7GFSQbjQiU72gYwVMQh0zLSCtb7wZj8iJn6QdKAbphz41P/AKfn6c5F7B6P1cS63OSmx1qNrf8ACPtHv3S5RS+OXQlFWJTbmz77JwlUDWmzX/DUZv8AkF9Zk9l9d89dEOuVHy88pIP9Ql22psZf0CphkFwtEhL7yyi6k9+YCc19nuKKY2nb/wAism+w1GYX81Eppz5lKfq39yb3Ot1VVlu9wBqRu13azaQCwtu4TFWIAJe1hY+YmKttGmlPrKhyL37z4Die4TDlrB3bcpXTFbYpu9VPwt9JgO10XBnD5czuxJO4KLix7zpMW29priKxqKpVbBRfeQL6nlv3TNsno1VxHbJCUj9reTbQ5R9T8Z63wxpR5mLW+aPObcpy0ZuRuwahXE0SASesUWHImx+BM6ZiVfMHQ3y6FeY/OQeH2dTw7nqhqD7x1Y+J+kmsHUZiW7I5gXv3X/OZOJnqamtrfPJpoQ0JxZkxFBXtmYgX3brn85j2uAMO4G4Lb5TJUZAVL779kb9532+sxbdP+nfwHzEzRb1RXn7ls/0v0KzsdL16Y/iv6a/Se8fTy1HHJj6cPhMvRtL1weSsfp9Zl2/TtWJ+8Afp9JvcvztPgxKP5V/JN4atagrfwD13TX2XXOYg/a18+P8AndNRa16NNeQN/UgTzRqZSDyN5nVLEl3b/k1qW3oaPTGreqq/dS/mxP5Cb+w8LlwjtxdXPkAQPr6yK6WH/UH8K/WWvZ9C1BFP7sA+Y1mJGuTtBFX2D/3FP+b+lpZjRDlai6MDqD3bwe+VbZqFa6qSQcxW43g6iW+nRKg9onxtJwdttyFTc8uKd1zAFjuvrOWe2Q/6mgOAon4sfynU+uphwv2zpz8iZxn2nY3rMfUF9KSrTHkMzfFj6Tucb++xWyQ9kNKicU7Ow61af6tDvN/fYd4AA8GM6dtuvZAo3t8h/gnAcbhMVg6tNmDUqllqU2HIgEEHuvYjynTdg9JxjlBay1kADqP61/hJ9N0tpRvUTIt/CXPZWJBp6n3ND4cJoYvEF2ud3Ad35zWw5IB10PxtPZl8aajJsi5XVjZ2aQKg8Df0nzDVDiK+b/xU93eeB8ePlNOurMLLvNgPOTmEopQpgEgAaljpc8ZCq1HP/p4X3Z1Zx0N6Jr4XErUXMt7Xtcgi9uV+E2JkaadmWiIicAiIgCaeP6zL2FVx9pW4ju4TcnlnA3mdTswVSkUDlQGQn7DcD3HiPGVXa+0mxpqYegGDUmOZW7OcA5Tv4BuBnTMQKTe8AbbtNR4GVavsJhi1xFIgBgUrDdmWxyVPxAgA9x7tdiq3ae3v358kIpRvsyH2L0TRLPXs78F+yPH7x+EsKLZxbmLes3f0Q8xPtHC2cMTcDh8pa6q6sg7snJw/G0jhNoEDsilXBHchIZf/AEInaP0scjOc+0fY7vWWvTXslArklQAwJsTc8QQP5ZRwstEnqwmi1Jydo7nQQXKdoKWscpO4ngbeM5rsPD7Q2k1SpXqKOqbIqlQAGuQ4XLqLZeN76azomAxSvSpkkNdFuym4LWFyrDeLgzU2LgEw9TEuN1er1gH3eyAw/wB2Y+cqg5RepbkWlKLi9irdINkJhjTVSWupJJ4m/LgN0ufRlbYWl+En1JP1lX9omMVOpdtFOZNeZsfSwOstGyHCUKaneEANrEeR4iX1pudGKbu+v1KqdPTUbtZdPoauOH6xvGMDVKuLcTY+BmfHU87Zhy1vMNPDkEE2sDOppws+xJp3JVAmbddrDW27zmtt/wD7d/L+oTLnp3uQd9x3SN6UY+mmFqOxyqtiSd1rjlqTM8E9afoSnmLRg6KJ23bkoHqf7TP0mp+43iPkR9Zh6KVV6s1Lgq57JBBBAuPnebm3GD0jbeva100AN/hLnK9fV0/wq5bVLQ1nt5uRmD93zMzDlzmj0exKV6Zak6uAxU24EfMd4k1g6ADAtw89ZbKpHdHYwlFaWrMg+ktPNigvMIPXSXUC0pGK2th32qlAODUADFRrYqC1jyNgDbvEuP6Uvf6TzlF9jXJqyKrtKllxR32LK2nJiL287yxYJHAsTdTuvcEd1jK/0u2lQpVKDu4XMwUX4kEEeWp1lmq1FIte3lxkleziRnsmKXVDMygaXuQPXWcH2bQOO2goOorVy7f/AB3Lt/6gidU2l0m2caVZRi1B6tlOXM2QsCLhQN4PCV/2Y9H1pu2KNRHUqUp5b8xmY8t1t/Ezu3c5pbjfoi69Itg0MZRNKqO9WHvI3BlP03GcPrYLFYHFKFF3B7BA0qLuIt38Rw+M/QnXrzlH6WfqqNViGIJyoVF2LVCFXL/FrJ0o3vmz6EHa6vt1JHC1c6K2moG43APEXG+xuJlWQ3RPYT4XDhHzGo5zvvIViPdHDTieJ8pOJRJNgDfvmtSxkrazg+U8atIljq1uyO/x4CZMNgKtdhUrkhOCbvhwHxm5g9lqpzv2n4cl8PzkpKJ10v0b9/6/smoX3PCIAAAAANwE9xEylgiIgCIiAfDNB6DX3X75IRJRk0cauRpptyPpPmU8jJOJLmM5pIuxn2ScTvN8DSRc0Nt7Kp4qi1GrmCMQSVIDdkgixII3jlLFaLRzfA0lM2X0SoYdg1OriezwNU5SORVQARLBJPKJ8yjkI5osVTpH0coY1UFY1FyElSjAe9a9wykHcOEx7G2FVw7DLi6lSjuNKqitw0yuCMp8iDy4y3ZByEZByHpHMFiOiSOQch6R1Y5D0neb4GkjpVtr9EXxVVmxOMrGhfs0KIWkoXkzEsXJ1u3Z38JeurHIekdWOQ9Jzm+BpIPZezqWHpJRorlpoLKLs2l772JJ1JmzUQMCpFwQQRzB3yT6sch6R1Y5D0jm+BpOf0OgFCiwfB4jFYWxvkSoHpnxSqCSPEyf2vs04il1XX1qIPvNQKIzC2ozMrFQf4bHvlh6sch6R1Y5D0jmeBpKXsjoTgcPWFemtRqyggVKlWox1FjpfKdCRuk/XVipCNlYjRiM1jzy3F5K9WOQ9I6sch6RzfAsc6xHs6oVnD4vFYrEML+89NF132CICo7gRaXQmSPVjkPSOrXkPSOaNJXtp7EwuI/b0Uc7sxFmHg62YeszbNwFKhTWlSXLTUWAuTvJJuTvNyZN9WvIekdWOQ9I5i7DSR08VKStbMAcpzC4vZtRcd+p9ZKZByHpPuQchHN8DSRsSTyifY5vgaSMCnkZkC1OF5vxOOoLGKiG+1MsRK2SEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQD//2Q==" alt="Document Image"
        w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
            borderRadius='20px'
          />
          <Button
            position='absolute'
            bg='white'
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            p='0px !important'
            top='14px'
            right='14px'
            borderRadius='50%'
            minW='36px'
            h='36px'
            onClick={() => {
              ;
            }}>
            <Icon
              transition='0.2s linear'
              w='20px'
              h='20px'
              as={like ? IoHeart : IoHeartOutline}
              color='brand.500'
            />
          </Button>
        </Box>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Flex direction='column'>
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'>
                {description}
              </Text>
              <Text
                color='secondaryGray.600'
                fontSize={{
                  base: "sm",
                }}
                fontWeight='400'
                me='14px'>
                {location}
              </Text>
            {/*</Flex>*/}
            {/*<AvatarGroup*/}
            {/*  max={3}*/}
            {/*  color={textColorBid}*/}
            {/*  size='sm'*/}
            {/*  mt={{*/}
            {/*    base: "0px",*/}
            {/*    md: "10px",*/}
            {/*    lg: "0px",*/}
            {/*    xl: "10px",*/}
            {/*    "2xl": "0px",*/}
            {/*  }}*/}
              {/*fontSize='12px'>*/}
            {/*  /!*{bidders.map((avt, key) => (*!/*/}
            {/*//     <Avatar key={key} src={avt} />*/}
            {/*//   ))}*/}
            {/*// </AvatarGroup>*/}
            <Text
                color='secondaryGray.600'
                fontSize={{
                  base: "sm",
                }}
                fontWeight='400'
                me='14px'>
                {category}
              </Text>
          </Flex>
          <Flex
            align='start'
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt='25px'>
            <Text fontWeight='700' fontSize='sm' color={textColorBid}>
              Amount needed: {total_amount}
            </Text>
              <Text fontWeight='700' fontSize='sm' color={textColorBid}>
              Amount left: {amount_left}
            </Text>
               <Text fontWeight='700' fontSize='sm' color={textColorBid}>
              Charity Address: {issuer}
            </Text>
              <Text fontWeight='700' fontSize='sm' color={textColorBid}>
              Retailer: {type_retailer}
            </Text>
              <Text fontWeight='700' fontSize='sm' color={textColorBid}>
              Retailer Address: {retailer_address}
            </Text>

             {/*<Button onClick={handleOpen}>View NFT</Button>*/}
          </Flex>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Donation Overview</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <img src="https://imgv2-2-f.scribdassets.com/img/document/443274541/original/e79a5df46b/1687461908?v=1" />
                        <h2><b>{description}</b></h2>
                        <p>Retailer: {type_retailer}</p>
                        <p>Retailer address: {retailer_address}</p>
                        <p><b>Total amount needed: {amount_left}</b></p>
                        <p>Charity address: {issuer}</p>

                        <Input placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Transact
                        </Button>
                        <Button variant="ghost" onClick={handleClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
          </Flex>
        </Flex>
      </Flex>
    </Card>
      </div>
  );
}
